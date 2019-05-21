const mongoose = require("../db");
const Schema = mongoose.Schema;
const StudentSchema = require("./student").studentSchema;
const TeacherSchema = require("./teacher").TeacherSchema;

const GradeSchema = new Schema({
  student: StudentSchema,
  teacher: TeacherSchema,
  grade: Number,
  date: Date
});

const GradeModel = mongoose.model("Grade", GradeSchema);

module.exports = {
  GradeModel,
  GradeSchema
};
