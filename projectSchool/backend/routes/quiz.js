const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../utils/middleware/authMiddleware.js");
const { roleMiddleware } = require("../utils/middleware/role.js");
const { Quiz } = require("../schema/quiz.js");
const { Question } = require("../schema/question");

router.post(
  "/create",
  authMiddleware,
  roleMiddleware(["teacher"]),
  async (req, res) => {
    if (!req.body.title || !req.body.subject || !req.body.class) {
      console.log(req.body.userId);
      return res
        .status(400)
        .json({ message: "Title, subject, and class are required" });
    }

    const quiz = new Quiz({
      title: req.body.title,
      subject: req.body.subject,
      class: req.body.class,
      createdBy: req.user.userId,
    });

    await quiz.save();

    res.status(201).json({ message: "Quiz created successfully", quiz });
  }
);

router.post(
  "/:quizId/question",
  authMiddleware,
  roleMiddleware(["teacher"]),
  async (req, res) => {
    const { quizId } = req.params;
    const { questionText, options, marks } = req.body;

    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    const question = await Question.create({
      quizId,
      questionText,
      options,
      marks,
    });

    res.status(201).json({ message: "Question added successfully", question });
  }
);

// router.post(
//   "/quizCreated",
//   authMiddleware,
//   roleMiddleware(["teacher"]),
//   async (req, res) => {
//     res.json({ message: "Quiz created successfully" });
//   }
// );

module.exports = router;
