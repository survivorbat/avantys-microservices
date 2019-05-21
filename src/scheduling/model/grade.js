const mongoose = require("../config/db");
const Schema = mongoose.Schema;
const StudentSchema = require("./student").StudentSchema;
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
