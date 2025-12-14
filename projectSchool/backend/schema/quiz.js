const express = require('express');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const quizSchema = new Schema(
    {
  title: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  class: {
    type: String,
    required: true
  },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  isPublished: {
    type: Boolean,
    default: false
  }
}, { timestamps: true }
)

const Quiz = mongoose.model('Quiz', quizSchema);
module.exports = { Quiz };