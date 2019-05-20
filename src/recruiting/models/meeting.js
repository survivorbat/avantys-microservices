const mongoose = require("../db");
const Schema = mongoose.Schema;

var Student = require("./potential-student");
var Teacher = require("./teacher");

const meetingSchema = new Schema({
  date: {
    type: Date,
    required: true
  },
  student: Student.potentialStudentSchema,
  teacher: Teacher.teacherSchema
});

const Meeting = mongoose.model("Meeting", meetingSchema);

module.exports = {
  Meeting,
  meetingSchema
};
