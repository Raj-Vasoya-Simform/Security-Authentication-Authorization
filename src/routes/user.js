const express = require("express");
const { signup, signin, logout } = require("../controllers/user");
const userRouter = express.Router();


userRouter.post("/signup", signup);

userRouter.post("/signin", signin);

userRouter.post('/logout', logout)

module.exports = userRouter;
