const mongoose = require("../config/db");

const Schema = mongoose.Schema;
const moduleSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});

const Module = mongoose.model("Module", moduleSchema);

module.exports = {
  Module,
  moduleSchema
};
