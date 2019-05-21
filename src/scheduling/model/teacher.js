const mongoose = require("../config/db");

const Schema = mongoose.Schema;
const TeacherSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  }
});

const Teacher = mongoose.model("Teacher", TeacherSchema);

module.exports = {
  Teacher,
  TeacherSchema
};
