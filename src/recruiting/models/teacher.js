const mongoose = require('../db');
const Schema = mongoose.Schema;

const teacherSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    minlength: 2,
    maxLength: 128
  },
  lastName: {
    type: String,
    required: true,
    minlength: 2,
    maxLength: 128
  }
});

const Teacher = mongoose.model("Teacher", teacherSchema);

module.exports = {
    Teacher,
    teacherSchema
};