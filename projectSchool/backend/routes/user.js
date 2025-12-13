const express = require("express");
const router = express.Router();
const User = require("../schema/user");
const { signup, login } = require("../utils/middleware/zod.js");
const { signToken } = require("../utils/jwt.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

router.post("/signup", signup, async (req, res) => {
  const { firstName, lastName, email, password, role } = req.body;
  console.log(firstName, lastName, email, password, role);

  const existingUser = await User.findOne({
    email: email,
  });

  if (existingUser) {
    return res.status(400).json({
      message: "User with this email already exists",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    firstname: firstName,
    lastname: lastName,
    email: email,
    password: hashedPassword,
    role: role,
  });

  await newUser.save();

  const token = signToken(newUser);
  res.json({
    message: "User created successfully",
    token: token,
  });
});

router.post("/signin", login, async (req, res) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({
    email: email,
  });

  if (!existingUser) {
    return res.status(400).json({
      message: "User with this email does not exist",
    });
  }

  const passwordMatch = await bcrypt.compare(password, existingUser.password);
  if (!passwordMatch) {
    return res.status(400).json({
      message: "Invalid password",
    });
  }

  const token = signToken(existingUser);
  res.json({
    message: "User logged in successfully",
    token: token,
  });
});

router.get("/me", async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "Authorization header missing" });
  }
  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    console.log(user);
    res.json({ user });
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
});

module.exports = router;
