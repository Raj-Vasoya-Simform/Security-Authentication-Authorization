const userModel = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "NOTES@_API";
const session = require("express-session");

const signup = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    // Existing User Check
    const existingUSer = await userModel.findOne({ email: email });
    if (existingUSer) {
      return res.status(400).json({ message: "User already exists." });
    }
    // Hashed Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // User Creation
    const result = await userModel.create({
      email: email,
      password: hashedPassword,
      username: username,
    });

    // Token Generate
    const token = jwt.sign({ email: result.email, id: result._id }, SECRET_KEY);
    res.status(200).json({ user: result, token: token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Existing User Check
    const existingUSer = await userModel.findOne({ email: email });
    if (!existingUSer) {
      return res.status(404).json({ message: "User not Found." });
    }

    // Matching Credentials
    const matchPassword = await bcrypt.compare(password, existingUSer.password);

    if (!matchPassword) {
      return res.status(400).json({ message: "Invalid Credentials." });
    }

    // Token Generation
    const token = jwt.sign(
      { email: existingUSer.email, id: existingUSer._id },
      SECRET_KEY
    );

    // Checking For Session
    req.session.isAuth = true;

    res.status(201).json({ user: existingUSer, token: token });
  } catch (error) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const logout = async (req, res) => {
  req.session.destroy((err) => {
    if (err) throw err;
    res.json({ message: "Session Destroyed Successfully." });
  });
};
module.exports = { signup, signin, logout };
