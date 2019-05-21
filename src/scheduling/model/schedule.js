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
