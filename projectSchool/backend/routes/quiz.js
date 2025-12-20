const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../utils/middleware/authMiddleware.js");
const { roleMiddleware } = require("../utils/middleware/role.js");
const { Quiz } = require("../schema/quiz.js");
const { Question } = require("../schema/question");

// creating quiz
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

// getting all quizzes
router.get(
  "/:quizId/questions",
  authMiddleware,
  roleMiddleware(["teacher"]),
  async (req, res) => {
    const { quizId } = req.params;

    const Questions = await Question.find({ quizId });
    if (!Questions) {
      return res
        .status(404)
        .json({ message: "the Quiz you are looking for is not available" });
    }
    console.log(Questions, " ", quizId, " ", Questions.length);
    res.json({
      quizId,
      totalQuestions: Questions.length,
      Questions,
      message: "Quiz fetched successfully",
    });
  }
);

// adding questions to quiz
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

// publishing quiz

router.patch(
  "/:quizId/publish",
  authMiddleware,
  roleMiddleware(["teacher"]),
  async (req, res) => {
    const { quizId } = req.params;
    const quiz = await Quiz.findByIdAndUpdate(
      quizId,
      { isPublished: true },
      { new: true }
    );
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }
    res.json({ message: "Quiz published successfully", quiz });
  }
);

//available quizzes for students
router.get(
  "/available",
  // authMiddleware,
  // roleMiddleware(["student"]),
  async (req, res) => {
    const quizzes = await Quiz.find({ isPublished: true }).select(
      "title subject class createdBy createdAt"
    );
    console.log(quizzes.length, "hwllo");
    res.json({ totalQuizzes: quizzes.length, quizzes });
  }
);

// getting questions for a quiz
router.get("/:quizId/questions", authMiddleware, async (req, res) => {
  const { quizId } = req.params;
  const quiz = await Quiz.findById(quizId);
  if (!quiz) {
    return res
      .status(404)
      .json({ message: "Quiz not found or not published yet" });
  }
  let questions;
  if (req.user.role === "teacher") {
    questions = await Question.find({ quizId });
  }
  if (req.user.role === "student") {
    questions = await Question.find({ quizId }).select(
      "questionText options.text marks"
    );
  }
  res.json({ quizId, totalQuestions: questions.length, questions });
});

//preventing multiple quiz attempts by same student
router.post(
  "/:quizId/start",
  authMiddleware,
  roleMiddleware(["Student"]),
  async (req, res) => {
    const existingAttempt = await QuizAttempt.findOne({
      quizId: req.params.quizId,
      studentId: req.user.userId
    });

    if (existingAttempt) {
      return res.status(400).json({ message: "Quiz already started" });
    }

    const attempt = await QuizAttempt.create({
      quizId: req.params.quizId,
      studentId: req.user.userId
    });

    res.json({
      message: "Quiz started",
      attemptId: attempt._id
    });
  }
);


// starting a quiz
router.post(
  "/:quizId/start",
  authMiddleware,
  roleMiddleware(["student"]),
  async (req, res) => {
    const { quizId } = req.params;
    const quiz = await Quiz.findOne({
      _id: req.params.quizId,
      isPublished: true,
    });

    if (!quiz) {
      return res.status(404).json({ message: "Quiz not available" });
    }

    const questions = await Question.find({ quizId: quiz._id }).select(
      "questionText options.text marks"
    );

    res.json({
      quizId: quiz._id,
      title: quiz.title,
      timeLimit: quiz.timeLimit || 10,
      totalQuestions: questions.length,
      questions,
    });
  }
);

// student submits quiz answers
router.post(
  "/:quizId/submit",
  authMiddleware,
  roleMiddleware(["Student"]),
  async (req, res) => {
    const { answers } = req.body;

    const attempt = await QuizAttempt.findOne({
      quizId: req.params.quizId,
      studentId: req.user.userId,
      status: "IN_PROGRESS"
    });

    if (!attempt) {
      return res.status(400).json({ message: "No active attempt" });
    }

    let score = 0;
    const evaluatedAnswers = [];

    for (const ans of answers) {
      const question = await Question.findById(ans.questionId);

      const correctOption = question.options.find(opt => opt.isCorrect);

      const isCorrect = correctOption.text === ans.selectedOption;
      const marksAwarded = isCorrect ? question.marks : 0;

      score += marksAwarded;

      evaluatedAnswers.push({
        questionId: question._id,
        selectedOption: ans.selectedOption,
        isCorrect,
        marksAwarded
      });
    }

    attempt.answers = evaluatedAnswers;
    attempt.score = score;
    attempt.status = "SUBMITTED";

    await attempt.save();

    res.json({
      message: "Quiz submitted successfully",
      score
    });
  }
);

// student views their quiz results
router.get(
  "/:quizId/result",
  authMiddleware,
  roleMiddleware(["Student"]),
  async (req, res) => {
    const attempt = await QuizAttempt.findOne({
      quizId: req.params.quizId,
      studentId: req.user.userId
    }).select("-answers.isCorrect");

    if (!attempt) {
      return res.status(404).json({ message: "Result not found" });
    }

    res.json(attempt);
  }
);


// teacher view results of a quiz
router.get(
  "/:quizId/results",
  authMiddleware,
  roleMiddleware(["Teacher"]),
  async (req, res) => {
    const results = await QuizAttempt.find({
      quizId: req.params.quizId,
      status: "SUBMITTED"
    }).populate("studentId", "firstname lastname email");

    res.json({
      totalSubmissions: results.length,
      results
    });
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
