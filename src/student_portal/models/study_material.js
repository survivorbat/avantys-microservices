const mongoose = require('../config/db');
const Schema = mongoose.Schema;


const materialSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxLength: 128
      },
      url: {
        type: String,
        required: true,
      },
});

const Study_Material = mongoose.model("Study_Material", materialSchema);

module.exports = {
    Study_Material,
    materialSchema
};