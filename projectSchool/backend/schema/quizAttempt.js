const mongoose = require("mongoose");

const quizAttemptSchema = new mongoose.Schema({
  quizId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Quiz",
    required: true
  },

  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  answers: [
    {
      questionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question"
      },
      selectedOption: String,
      isCorrect: Boolean,
      marksAwarded: Number
    }
  ],

  score: {
    type: Number,
    default: 0
  },

  status: {
    type: String,
    enum: ["IN_PROGRESS", "SUBMITTED"],
    default: "IN_PROGRESS"
  }

}, { timestamps: true });

module.exports = mongoose.model("QuizAttempt", quizAttemptSchema);
