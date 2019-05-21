const mongoose = require("../db");
const Schema = mongoose.Schema;

const potentialStudentSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    minlength: 2,
    maxLength: 128
  },
  lastName: {
    type: String,
    required: true,
    minlength: 2,
    maxLength: 128
  },
  email: {
      type: String,
      required: true
  }
});

const PotentialStudent = mongoose.model("PotentialStudent", potentialStudentSchema);

module.exports = {
    PotentialStudent,
    potentialStudentSchema
};
