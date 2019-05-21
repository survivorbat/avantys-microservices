const express = require("express");
const router = express.Router();
const rabbit = require("../rabbit/rabbot");

let Student = require("./models/potential-student").PotentialStudent;
let Teacher = require("./models/teacher").Teacher;
let Meeting = require("./models/meeting").Meeting;
/**
 * @swagger
 * /students:
 *    get:
 *      description: Return list of students
 *      produces:
 *        - application/json
 *      responses:
 *        201:
 *          description: Return created students
 *        400:
 *          description: Something unexpected went wrong
 */

router.get("/students", (req, res) => {
  Student.find()
    .then(students => {
      if (students == null || students == []) {
        res.status(200).json({ message: "no students found" });
      }
      res.status(200).json(students);
    })
    .catch(error => res.status(401).json(error));
});

/**
 * @swagger
 * /student/{id}:
 *    get:
 *      description: Return student
 *      produces:
 *        - application/json
 *      parameters:
 *       - name: id
 *         description: The Student Number of the Student
 *         required: true
 *         in: path
 *         type: string
 *      responses:
 *        201:
 *          description: Return created students
 *        400:
 *          description: Something unexpected went wrong
 */

router.get("/student/:_id", ({ params: { _id } }, res) => {
  res.contentType("application/json");
  Student.findOne({ _id })
    .then(student => {
      if (student == null) {
        res.status(200).json({ message: "student not found" });
      }
      res.status(200).json(student);
    })
    .catch(error => res.status(401).json(error));
});

/**
 * @swagger
 * /student:
 *    post:
 *      description: Register student
 *      produces:
 *        - application/json
 *      parameters:
 *      - name: firstName
 *        description: The student's first name
 *        required: true
 *        in: formData
 *        type: string
 *      - name: lastName
 *        description: The student's last name
 *        required: true
 *        in: formData
 *        type: string
 *      - name: email
 *        description: The student's email adress
 *        required: true
 *        in: formData
 *        type: string
 *      responses:
 *        201:
 *          description: Return created students
 *        400:
 *          description: Something unexpected went wrong
 */

router.post("/student", ({ body }, res) => {
  res.contentType("application/json");
  new Student(body)
    .save()
    .then(function(student) {
      res.status(201).json(student);
    })
    .catch(function(error) {
      res.status(400).json(error);
    });
});

/**
 * @swagger
 * /student:
 *    post:
 *      description: Update student
 *      produces:
 *        - application/json
 *      parameters:
 *      - name: firstName
 *        description: The student's first name
 *        required: false
 *        in: formData
 *        type: string
 *      - name: lastName
 *        description: The student's last name
 *        required: false
 *        in: formData
 *        type: string
 *      - name: email
 *        description: The student's email adress
 *        required: false
 *        in: formData
 *        type: string
 *      responses:
 *        201:
 *          description: Return created students
 *        400:
 *          description: Something unexpected went wrong
 */

router.put("/student/:_id", ({ body }, { params: { _id } }, res) => {
  Student.update({ _id }, body)
    .then(student => {
      res.status(201).json(student);
    })
    .catch(function(error) {
      res.status(400).json(error);
    });
});

/**
 * @swagger
 * /student/{id}:
 *    delete:
 *      description: Unregister student
 *      produces:
 *        - application/json
 *      parameters:
 *       - name: id
 *         description: The Student Number of the Student
 *         required: true
 *         in: path
 *         type: string
 *      responses:
 *        201:
 *          description: Return deleted students
 *        400:
 *          description: Something unexpected went wrong
 */

router.delete("/student/:_id", ({ params: { _id } }, res) => {
  res.contentType("application/json");

  Student.findOneAndRemove({ _id })
    .then(student => {
      res.status(200).json({ "Album Deleted": student });
    })
    .catch(function(error) {
      res.status(400).json(error);
    });
});

/**
 * @swagger
 * /teachers:
 *    get:
 *      description: Return list of teachers
 *      produces:
 *        - application/json
 *      responses:
 *        201:
 *          description: Return list of teachers
 *        400:
 *          description: Something unexpected went wrong
 */

router.get("/teachers", (req, res) => {
  Teacher.find()
    .then(teachers => {
      if (teachers == null || teachers == []) {
        res.status(200).json({ message: "no teachers found" });
      }
      res.status(200).json(teachers);
    })
    .catch(error => res.status(401).json(error));
});

/**
 * @swagger
 * /teacher/{id}:
 *    get:
 *      description: Return teacher
 *      produces:
 *        - application/json
 *      parameters:
 *       - name: id
 *         description: The employee Number of the teacher
 *         required: true
 *         in: path
 *         type: string
 *      responses:
 *        201:
 *          description: Return teacher
 *        400:
 *          description: Something unexpected went wrong
 */

router.get("/teacher/:_id", ({ params: { _id } }, res) => {
  Teacher.findOne({ _id })
    .then(teacher => {
      if (teacher == null) {
        res.status(200).json({ message: "teacher not found" });
      }
      res.status(200).json(teacher);
    })
    .catch(error => res.status(401).json(error));
});

/**
 * @swagger
 * /teacher:
 *    post:
 *      description: Register teacher
 *      produces:
 *        - application/json
 *      parameters:
 *      - name: firstName
 *        description: The teacher's first name
 *        required: true
 *        in: formData
 *        type: string
 *      - name: lastName
 *        description: The teacher's last name
 *        required: true
 *        in: formData
 *        type: string
 *      - name: email
 *        description: The teacher's email adress
 *        required: true
 *        in: formData
 *        type: string
 *      responses:
 *        201:
 *          description: Return created teacher
 *        400:
 *          description: Something unexpected went wrong
 */

router.post("/teacher", ({ body }, res) => {
  const teacher = new Teacher(body);
  teacher
    .save()
    .then(function(teacher) {
      res.status(201).json(teacher);
    })
    .catch(function(error) {
      res.status(400).json(error);
    });
});

/**
 * @swagger
 * /teacher:
 *    post:
 *      description: Update teacher
 *      produces:
 *        - application/json
 *      parameters:
 *      - name: firstName
 *        description: The teacher's first name
 *        required: false
 *        in: formData
 *        type: string
 *      - name: lastName
 *        description: The teacher's last name
 *        required: false
 *        in: formData
 *        type: string
 *      - name: email
 *        description: The teacher's email adress
 *        required: false
 *        in: formData
 *        type: string
 *      responses:
 *        201:
 *          description: Return created students
 *        400:
 *          description: Something unexpected went wrong
 */

router.put("/teacher/:_id", ({ body }, { params: { _id } }, res) => {
  Teacher.update({ _id }, body)
    .then(function(teacher) {
      res.status(201).json(teacher);
    })
    .catch(function(error) {
      res.status(400).json(error);
    });
});

/**
 * @swagger
 * /teacher/{id}:
 *    delete:
 *      description: Unregister teacher
 *      produces:
 *        - application/json
 *      parameters:
 *       - name: id
 *         description: The teacher Number of the teacher
 *         required: true
 *         in: path
 *         type: string
 *      responses:
 *        201:
 *          description: Return deleted teacher
 *        400:
 *          description: Something unexpected went wrong
 */

router.delete("/teacher/:_id", ({ params: { _id } }, res) => {
  Teacher.findOneAndRemove({ _id })
    .then(function(teacher) {
      res.status(200).json({ "Album Deleted": teacher });
    })
    .catch(function(error) {
      res.status(400).json(error);
    });
});

/**
 * @swagger
 * /meeting:
 *    post:
 *      description: Create meeting
 *      produces:
 *        - application/json
 *      parameters:
 *      - name: date
 *        description: The date and time of the meeting YY-MM-DD:HH:MM
 *        required: true
 *        in: formData
 *        type: string
 *        format: date
 *      - name: student
 *        description: The Id of an existing student
 *        required: true
 *        type: string
 *      - name: teacher
 *        description: The Id of an existing teacher
 *        required: true
 *        type: string
 *      responses:
 *        201:
 *          description: Return created students
 *        400:
 *          description: Something unexpected went wrong
 */

router.post("/meeting", async ({ body }, res) => {
  const teacherId = body.teacher;
  const studentId = body.student;
  const student = await Student.findOne({ _id: studentId }).catch(error =>
    res.status(401).json(error)
  );
  const teacher = await Teacher.findOne({ _id: teacherId }).catch(error =>
    res.status(401).json(error)
  );
  var meeting = new Meeting({
    date: body.date,
    student: student,
    teacher: teacher
  });
  meeting
    .save()
    .then(meeting => {
      res.status(201).json(meeting);
    })
    .catch(error => res.status(401).json(error));
});

/**
 * @swagger
 * /meetings:
 *    get:
 *      description: Return list of meetings
 *      produces:
 *        - application/json
 *      responses:
 *        201:
 *          description: Return list of meetings
 *        400:
 *          description: Something unexpected went wrong
 */

router.get("/meetings", (req, res) => {
  Meeting.find({})
    .then(meetings => {
      if (meetings == null || meetings == []) {
        res.status(200).json({ message: "no meetings found" });
      }
      res.status(200).json(meetings);
    })
    .catch(error => res.status(401).json(error));
});

/**
 * @swagger
 * /meeting/{id}:
 *    get:
 *      description: Return meeting
 *      produces:
 *        - application/json
 *      parameters:
 *       - name: id
 *         description: The id of the meeting
 *         required: true
 *         in: path
 *         type: string
 *      responses:
 *        201:
 *          description: Return meeting
 *        400:
 *          description: Something unexpected went wrong
 */

router.get("/meeting/:_id", ({ params: { _id } }, res) => {
  Meeting.findOne({ _id })
    .then(meeting => {
      if (meeting == null) {
        res.status(200).json({ message: "meeting not found" });
      }
      res.status(200).json(meeting);
    })
    .catch(error => res.status(401).json(error));
});

/**
 * @swagger
 * /meeting/{id}:
 *    delete:
 *      description: Unregister meeting
 *      produces:
 *        - application/json
 *      parameters:
 *       - name: id
 *         description: The id of the meeting
 *         required: true
 *         in: path
 *         type: string
 *      responses:
 *        201:
 *          description: Return deleted meeting
 *        400:
 *          description: Something unexpected went wrong
 */

router.delete("/meeting/:_id", ({ params: { _id } }, res) => {
  Meeting.findOneAndRemove({ _id })
    .then(meeting => {
      res.status(200).json({"Meeting Deleted" : meeting});
    })
    .catch(function(error) {
      res.status(400).json(error);
    });
});

/**
 * @swagger
 * /approve/{id}:
 *    post:
 *      description: Approve student
 *      produces:
 *        - application/json
 *      parameters:
 *       - name: id
 *         description: The Student Number of the Student
 *         required: true
 *         in: path
 *         type: string
 *      responses:
 *        201:
 *          description: Return approved student
 *        400:
 *          description: Something unexpected went wrong
 */

router.delete("/approve/:_id", ({ params: { _id } }, res) => {
  Student.findOneAndRemove({ _id })
    .then(student => {
      rabbit.publish("ex.1", {
        routingKey: "studentApproved",
        type: "studentApproved",
        body: student
      });
      res.status(200).json({"Student Deleted" : meeting});
    })
    .catch(function(error) {
      res.status(400).json(error);
    });
});

module.exports = router;
