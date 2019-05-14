const mongoose = require("../config/db");
const Class = require("./class").classSchema;
const Module = require("./module").moduleSchema;
const Study = require("./study").studySchema;

const Schema = mongoose.Schema;
const studentSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  classes: {
    type: [Class],
    required: false,
    default: []
  },
  modules: {
    type: [Module],
    required: false,
    default: []
  },
  study: {
    type: Study,
    required: true
  }
});

const Student = mongoose.model("Student", studentSchema);

module.exports = {
  Student,
  studentSchema
};
