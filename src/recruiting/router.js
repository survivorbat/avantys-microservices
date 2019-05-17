const express = require('express');
const router = express.Router();

var recruitingController = require('./controllers/recruiting');
var studentController = require('./controllers/student');
var Student = require('./models/potential-student').PotentialStudent;
var Teacher = require('./models/teacher').Teacher
/**
 * @swagger
 * /students:
 *    get:
 *      description: Return list of students
 */

router.get('/students', function(req, res) {
    Student.find({})
        .then((students) => {
            res.status(200).json(students);
        })
        .catch((error) => res.status(401).json(error));
});

router.get('/student/:id', function(req, res) {
    var studentId = req.params.id;
    res.contentType('application/json')
    Student.findOne({ _id: studentId})
        .then((student) => {
            res.status(200).json(student);
        })
        .catch((error) => res.status(401).json(error));
});

router.post('/student', function(req, res) {
    res.contentType('application/json');
    var student = new Student(req.body);
    student.save()
        .then(function (student) {
            res.status(201).json(student)
        })
        .catch(function (error) {
            res.status(400).json(error)
        })
});

router.put('/student/:id', function(req, res) {
    res.contentType('application/json');
    var studentId = req.params.id;
    var change = req.body;
    Student.update({ _id: studentId}, change)
        .then(function (student) {
            res.status(201).json(student)
        })
        .catch(function (error) {
            res.status(400).json(error)
        })
});

router.delete('/student/:id', function(req, res) {
    res.contentType('application/json');
    var studentId = req.params.id;

    Student.findOneAndRemove({ _id: studentId})
        .then(function(student) {
            res.status(200).json("Album Deleted: " + student)
        })
        .catch(function(error) {
            res.status(400).json(error);
        })
});



router.get('/teachers', function(req, res) {
    Teacher.find({})
        .then((teachers) => {
            res.status(200).json(teachers);
        })
        .catch((error) => res.status(401).json(error));
});

router.get('/teacher/:id', function(req, res) {
    var teacherId = req.params.id;
    res.contentType('application/json')
    Teacher.findOne({ _id: teacherId})
        .then((teacher) => {
            res.status(200).json(teacher);
        })
        .catch((error) => res.status(401).json(error));
});

router.post('/teacher', function(req, res) {
    res.contentType('application/json');
    var teacher = new Teacher(req.body);
    teacher.save()
        .then(function (teacher) {
            res.status(201).json(teacher)
        })
        .catch(function (error) {
            res.status(400).json(error)
        })
});

router.put('/teacher/:id', function(req, res) {
    res.contentType('application/json');
    var teacherId = req.params.id;
    var change = req.body;
    Teacher.update({ _id: teacherId}, change)
        .then(function (teacher) {
            res.status(201).json(teacher)
        })
        .catch(function (error) {
            res.status(400).json(error)
        })
});

router.delete('/teacher/:id', function(req, res) {
    res.contentType('application/json');
    var teacherId = req.params.id;

    Teacher.findOneAndRemove({ _id: teacherId})
        .then(function(teacher) {
            res.status(200).json("Album Deleted: " + teacher)
        })
        .catch(function(error) {
            res.status(400).json(error);
        })
});

// app.use('*', function (req, res) {
//     res.status(400);
//     res.json({
//         'error': 'URL not found'
//     });
// });

module.exports = router;