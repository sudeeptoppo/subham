// models/Student.js
const mongoose = require("mongoose");
const User = require("./user");

const StudentSchema = new mongoose.Schema({
  class: { 
    type: Number 
},
  registerationNumber: { 
    type: Number 
}
});

const Student = User.discriminator("Student", StudentSchema);

module.exports = Student;
