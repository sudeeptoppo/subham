// backend/routes/index.js
const express = require("express");
const router = express.Router();
const UserRouter = require("./user");
const QuizRouter = require("./quiz");

router.use("/user", UserRouter);
router.use("/quiz", QuizRouter);

module.exports = router;
