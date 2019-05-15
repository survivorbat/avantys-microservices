const express = require('express');
const router = express.Router();

var recruitingController = require('./controllers/recruiting');
var studentController = require('./controllers/student');
var Student = require('./models/potential-student').PotentialStudent;
/**
 * @swagger
 * /students:
 *    get:
 *      description: Return list of students
 */

// router.use('/', recruitingController);

// router.get("/students", studentController.getStudents)

router.get('/students', function(req, res) {
    console.log("test")
    Student.find({})
        .then((students) => {
            res.status(200).json(students);
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

// app.use('*', function (req, res) {
//     res.status(400);
//     res.json({
//         'error': 'URL not found'
//     });
// });

// router.get("/students", (req, res) => {
//     return res.send("Hello World");
// });

module.exports = router;