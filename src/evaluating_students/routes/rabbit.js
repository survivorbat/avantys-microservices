const express = require("express");
const router = express.Router();
const GradeModel = require("../model/grade").GradeModel;
const StudentModel = require("../model/student").StudentModel;
const TeacherModel = require("../model/teacher").TeacherModel;
const TestModel = require("../model/test").TestModel;
const rabbit = require("../rabbit/rabbot");

router.route("/").post(({ body: { firstName, lastName } }, res) => {
  if (!firstName || !lastName) {
    return res.sendStatus(400);
  }

  const student = new StudentModel({ firstName, lastName }, {});

  student
    .save()
    .then(savedStudent => {
      rabbit.publish("ex.1", {
        routingKey: "studentRegistered",
        type: "studentRegistered",
        body: savedStudent
      });
      res.status(201).json(savedStudent);
    })
    .catch(err => res.sendStatus(500));
});

module.exports = router;
