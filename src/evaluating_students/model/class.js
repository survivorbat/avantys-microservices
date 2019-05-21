const mongoose = require("../db");

const Schema = mongoose.Schema;
const classSchema = new Schema({
  name: {
    type: String,
    required: true
  }
});

const Class = mongoose.model("Class", classSchema);

module.exports = {
  Class,
  classSchema
};
