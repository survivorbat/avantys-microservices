var express = require('express');
var routes = express.Router();

var Student = require('../models/potential-student').PotentialStudent;

const getStudents = async (req, res, next) =>
    await Student.find({})
    .then((students) => {
        res.status(200).json(students);
    })
    .catch((error) => res.status(401).json(error));

// routes.get('/students', function(req, res) {
//     res.contentType('application/json');
//     Student.find({})
//         .then((students) => {
//             res.status(200).json(students);
//         })
//         .catch((error) => res.status(401).json(error));
// });

routes.get('/students/:id', function(req, res) {
    var studentId = req.params.id;
    res.contentType('application/json');

    Student.findOne({ _id: studentId})
        .then(function (student) {
            res.status(200).json(student)
        })
        .catch(function (error) {
            res.status(400).json(error);
         })
});

const postStudent = async ({ body }, res, next) => 
    await new Student(body, {})
        .save()
        .then(function (student) {
            res.status(201).json(student)
        })
        .catch(function (error) {
            res.status(400).json(error)
        })


// routes.post('/student', function(req, res) {

//     res.contentType('application/json');
//     var student = new Student(req.body);
//     student.save()
//         .then(function (student) {
//             res.status(201).json(student)
//         })
//         .catch(function (error) {
//             res.status(400).json(error)
//         })
// });

module.exports = {
    getStudents
}