const mongoose = require("../config/db");
const Schema = mongoose.Schema;

const TeacherSchema = new Schema({
  firstName: String,
  lastName: String
});

const TeacherModel = mongoose.model("Teacher", TeacherSchema);

module.exports = {
  TeacherModel,
  TeacherSchema
};
