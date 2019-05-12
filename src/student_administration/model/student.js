const mongoose = require("../config/db");

const Schema = mongoose.Schema;
const filmSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    minlength: 2,
    maxLength: 128
  },
  insertion: {
    type: String,
    required: false
  },
  lastName: {
    type: String,
    required: true,
    minlength: 2,
    maxLength: 128
  },
  studentNumber: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true,
    default: 0
  }
});

const Student = mongoose.model("Student", filmSchema);

module.exports = {
  Student
};
