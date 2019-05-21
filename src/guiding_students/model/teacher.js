const mongoose = require("../config/db");
const Schema = mongoose.Schema;

const teacherSchema = new Schema({
  firstName: String,
  lastName: String
});

const Teacher = mongoose.model("Teacher", teacherSchema);

module.exports = {
  Teacher,
  teacherSchema
};
