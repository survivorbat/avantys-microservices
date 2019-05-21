const mongoose = require("../config/db");

const Schema = mongoose.Schema;
const studySchema = new Schema({
  name: {
    type: String,
    required: true
  }
});

const Study = mongoose.model("Study", studySchema);

module.exports = {
  Study,
  studySchema
};
