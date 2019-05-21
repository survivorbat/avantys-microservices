const mongoose = require("../config/db");
const Module = require("./module").moduleSchema;
const Study = require("./study").studySchema;

const Schema = mongoose.Schema;
const StudentSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  class: {
    type: String,
    required: false
  },
  modules: {
    type: [Module],
    required: false,
    default: []
  },
  study: {
    type: Study,
    required: false
  }
});

const Student = mongoose.model("Student", StudentSchema);

module.exports = {
  Student,
  StudentSchema
};
