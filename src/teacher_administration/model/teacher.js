const mongoose = require("../config/db");

const Schema = mongoose.Schema;
const teacherSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  }
});

const Teacher = mongoose.model("Teacher", teacherSchema);

module.exports = {
  Teacher,
  teacherSchema
};
