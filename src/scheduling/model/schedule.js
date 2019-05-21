const Module = require("./module").moduleSchema;
const Test = require("./test").TestSchema;
const Teacher = require("./teacher").TeacherSchema;

const mongoose = require("../config/db");

const Schema = mongoose.Schema;
const scheduleSchema = new Schema({
  teacherId: {
    type: Number
  },
  testId: {
    type: Number
  },
  moduleId: {
    type: Number,
    required: true
  },
  teacher: {
    type: Teacher,
    required: false,
    default: null
  },
  test: {
    type: Test,
    required: false,
    default: null
  },
  module: {
    type: Module,
    required: false,
    default: null
  },
  class: {
    type: String,
    required: true
  },
  startDatetime: {
    type: Date,
    required: true
  },
  endDatetime: {
    type: Date,
    required: true
  }
});

const Schedule = mongoose.model("Lesson", scheduleSchema);

module.exports = {
  Schedule,
  scheduleSchema
};
