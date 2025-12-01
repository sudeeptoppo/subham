const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../model/user.js");
const auth = require("../middleware/auth.js");
require("dotenv").config();

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message: "Welcome to the user API",
  });
});

router.get("/register", (req, res) => {
  res.render("register.ejs");
});

router.post("/register", async (req, res) => {
  console.log(req.body);
  const { name, email, password, contact } = req.body;
  const user = await User.findOne({
    $or: [
      {
        email: email,
      },
      {
        name: name,
      },
    ],
  });

  if (user) {
    return res.status(400).json({
      message: "User already exists",
    });
  }

  const salt = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hashSync(password, salt);

  const newUser = new User({
    name: name,
    email: email,
    password: hashPassword,
    contact: contact,
  });
  await newUser.save();
  res.redirect("/api/user/login");
});

router.get("/login", (req, res) => {
  res.render("login.ejs");
});

router.post("/login", async (req, res) => {
  const { name, password } = req.body;
  const user = await User.findOne({ name: name });

  if (!user) {
    return res.status(400).json({
      message: `user noot found of name ${name}`,
      req: req.user,
    });
  }

  const isPasswordValid = bcrypt.compareSync(password, user.password);

  if (!isPasswordValid) {
    return res.status(400).json({
      message: "Invalid password",
    });
  }
  const token = jwt.sign(
    { name: name, userId: user._id },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
  res.json({
    message: "User logged in successfully",
    token: token,
    abc: user,
  });
});

//logout
router.get("/logout", auth, (req, res) => {
  console.log(req.user);
  res.json({
    message: "User logged out successfully",
  });
});
module.exports = router;
