const mongoose = require("../config/db");

const Schema = mongoose.Schema;
const scheduleSchema = new Schema({
  studentId: {
    type: Number,
    required: true
  },
  classId: {
    type: Number,
    required: true
  },
  moduleId: {
    type: Number,
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
