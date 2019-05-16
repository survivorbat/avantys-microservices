const mongoose = require("../config/db");

const Schema = mongoose.Schema;
const lessonSchema = new Schema({
  name: {
    type: String,
    required: true
  }
});

const Lesson = mongoose.model("Lesson", lessonSchema);

module.exports = {
  Lesson,
  lessonSchema
};
