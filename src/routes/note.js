const express = require("express");
const {
  getNote,
  createNote,
  deleteNote,
  updateNote,
} = require("../controllers/note");
const { auth, isAuth } = require("../middlewares/auth");

const noteRouter = express.Router();

noteRouter.get("/", isAuth, auth, getNote);

noteRouter.post("/", isAuth, auth, createNote);

noteRouter.delete("/:id", isAuth, auth, deleteNote);

noteRouter.put("/:id", isAuth, auth, updateNote);

module.exports = noteRouter;
