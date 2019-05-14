const mongoose = require("../db");
const Schema = mongoose.Schema;

const TeacherSchema = new Schema({
    firstName: String,
    lastName: String,
});

let TeacherModel = mongoose.model('Teacher', TeacherSchema);

module.exports = {
    TeacherModel,
    TeacherSchema
};