const mongoose = require("../db");
const Schema = mongoose.Schema;

const StudentSchema = new Schema({
  firstName: String,
  lastName: String
});

const StudentModel = mongoose.model("Student", StudentSchema);

module.exports = {
  StudentModel,
  StudentSchema
};
