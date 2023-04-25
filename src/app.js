const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const session = require("express-session");
const MongoDBSession = require("connect-mongodb-session")(session);

const noteRouter = require("./routes/note");
const userRouter = require("./routes/user");

dotenv.config();

const app = express();

app.use(express.json());

const mongoURI = process.env.MONGO_URL;

const store = new MongoDBSession({
  uri: mongoURI,
  collection: "mySessions",
});

app.use(
  session({
    secret: "thisisasecretkey",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);
app.use(cors());
app.use(helmet());
app.use("/notes", noteRouter);
app.use("/user", userRouter);

app.get("/", (req, res) => {
  console.log(req.session);
  console.log(req.session.id);
  res.send("Notes API Check it's working using Postman.");
});

const PORT = process.env.PORT || 3000;

mongoose
  .connect(mongoURI)
  .then(() => {
    app.listen(PORT, () => {
      console.log("Server is running on " + PORT + " PORT.");
    });
  })
  .catch((err) => console.log(err));
