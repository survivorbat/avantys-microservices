const mongoose = require("../db");

const Schema = mongoose.Schema;
const testResultSchema = new Schema({
  testName: {
    type: String,
    required: true
  },
  availableToStudents: {
    type: Boolean,
    required: true,
    default: false
  }
});

const TestResult = mongoose.model("TestResult", testResultSchema);

module.exports = {
  TestResult,
  testResultSchema
};
