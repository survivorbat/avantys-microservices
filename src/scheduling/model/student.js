const mongoose = require("../config/db");
const Class = require("./class").classSchema;
const Module = require("./module").moduleSchema;
const Study = require("./study").studySchema;

const Schema = mongoose.Schema;
const studentSchema = new Schema({
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
  },
  classes: {
    type: [Class],
    required: false,
    default: []
  },
  modules: {
    type: [Module],
    required: false,
    default: []
  },
  study: {
    type: Study,
    required: true
  }
});

const Student = mongoose.model("Student", studentSchema);

module.exports = {
  Student,
  studentSchema
};
