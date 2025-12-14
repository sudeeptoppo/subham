  const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  quizId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Quiz",
    required: true
  },

  questionText: {
    type: String,
    required: true
  },

  options: [
    {
      text: String,
      isCorrect: Boolean
    }
  ],

  marks: {
    type: Number,
    default: 1
  }
}, { timestamps: true });

const Question = mongoose.model("Question", questionSchema);

module.exports = {Question};