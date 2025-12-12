// models/Teacher.js
const mongoose = require("mongoose");
const User = require("./user");

const TeacherSchema = new mongoose.Schema({
  subjects: [{ type: String }], // Add other fields specific to teachers
  qualification: { type: String },
  assignedClasses: [{ type: String }]
});

const Teacher = User.discriminator("Teacher", TeacherSchema);

module.exports = Teacher;
