const express = require('express');
const app = express();
const port = 3000;

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/my_database', {useNewUrlParser: true});

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const TeacherSchema = new Schema({
    firstName: String,
    lastName: String,
    employeeNumber: Number,
});

let TeacherModel = mongoose.model('TeacherModel', TeacherSchema);

const StudentSchema = new Schema({
    firstName: String,
    lastName: String,
    studentNumber: Number,
});

let StudentModel = mongoose.model('TestModel', StudentSchema);

const GradeSchema = new Schema({
    student: Student,
    grade: Number,
    date: Date,
});

let GradeModel = mongoose.model('GradeModel', GradeSchema);

const TestSchema = new Schema({
    subject: ObjectId,
    class: ObjectId,
    enrolledStudents: [Student],
    participatedStudents: [Student],
    grades: [Grade],
    testDate: Date,
    gradingTeacher: Teacher
});

let Test = mongoose.model('Test', TestSchema);


app.get('/tests', (req, res) => {

    res.send('Hello World!')
});

app.put('/tests', (req, res) => res.send('Hello World!'));

app.post('/tests', (req, res) => res.send('Hello World!'));

app.delete('/tests', (req, res) => res.send('Hello World!'));


app.get('/tests/{id}', (req, res) => res.send('Hello World!'));

app.put('/tests/{id}', (req, res) => res.send('Hello World!'));

app.post('/tests/{id}', (req, res) => res.send('Hello World!'));

app.delete('/tests/{id}', (req, res) => res.send('Hello World!'));


app.listen(port, () => console.log(`Example app listening on port ${port}!`));

