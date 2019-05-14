const mongoose = require("../db");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const StudentSchema = require("./student").StudentSchema;
const GradeSchema = require("./grade").GradeSchema;


const TestSchema = new Schema({
    course: String,
    enrolledStudents: [StudentSchema],
    participatedStudents: [StudentSchema],
    grades: [GradeSchema],
    testDate: Date,
});

let TestModel = mongoose.model('Test', TestSchema);

module.exports = {
    TestModel,
    TestSchema
};