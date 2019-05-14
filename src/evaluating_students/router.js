const express = require("express");
const router = express.Router();
let GradeModel = require("./model/grade").GradeModel;
let StudentModel = require("./model/student").StudentModel;
let TeacherModel = require("./model/teacher").TeacherModel;
let TestModel = require("./model/test").TestModel;

/**
 * @swagger
 *  paths:
 *      /teachers:
 *         get:
 *           summary: Return list of all teachers
 *           responses:
 *              '200':
 *                  description: "List of all teachers"
 *              '500':
 *                  description: "Database query failed"
 *         put:
 *           summary: Not implemented.
 *           responses:
 *              '501':
 *                  description: "Not implemented"
 *         post:
 *           summary: Add teacher to teacher collection
 *           parameters:
 *              -   in: body
 *                  name: teacher
 *                  description: The teacher to create.
 *                  schema:
 *                      type: object
 *                      required:
 *                          -   firstName
 *                          -   lastName
 *                      properties:
 *                          firstName:
 *                              type: string
 *                          lastName:
 *                              type: string
 *           responses:
 *              '201':
 *                  description: "[Saved document teacher]"
 *              '400':
 *                  description: "Bad request"
 *              '500':
 *                  description: "Failed to save document"
 *         delete:
 *           summary: Deletes all documents in the teacher collection
 *           responses:
 *              '200':
 *                  description: "[Count of deleted documents]"
 *              '500':
 *                  description: "Failed to delete document"
 */
router
  .route("/teachers")
  .get((req, res) => {
    TeacherModel.find({})
      .then(allTeachers => res.json(allTeachers))
      .catch(() => res.sendStatus(500));
  })

  .put((req, res) => res.sendStatus(501))

  .post((req, res) => {
    let teacher = new TeacherModel();

    const firstName = req.body.firstName;
    const lastName = req.body.lastName;

    if (firstName === undefined || lastName === undefined) {
      res.sendStatus(400);
      return;
    }

    teacher.firstName = req.body.firstName;
    teacher.lastName = req.body.lastName;
    teacher
      .save()
      .then(savedTeacher => {
        res.status(201);
        res.json(savedTeacher);
      })
      .catch(err => res.sendStatus(500));
  })

  .delete((req, res) =>
    TeacherModel.remove({})
      .then(deleted => {
        res.status(200);
        res.json(deleted);
      })
      .catch(() => res.sendStatus(500))
  );

/**
 * @swagger
 *  paths:
 *      /students:
 *         get:
 *           summary: Return list of all students
 *           responses:
 *              '200':
 *                  description: "List of all students"
 *              '500':
 *                  description: "Database query failed"
 *         put:
 *           summary: Not implemented.
 *           responses:
 *              '501':
 *                  description: "Not implemented"
 *         post:
 *           summary: Add student to student collection
 *           parameters:
 *              -   in: body
 *                  name: student
 *                  description: The student to create.
 *                  schema:
 *                      type: object
 *                      required:
 *                          -   firstName
 *                          -   lastName
 *                      properties:
 *                          firstName:
 *                              type: string
 *                          lastName:
 *                              type: string
 *           responses:
 *              '201':
 *                  description: "[Saved document student]"
 *              '400':
 *                  description: "Bad request"
 *              '500':
 *                  description: "Failed to save document"
 *         delete:
 *           summary: Deletes all documents in the student collection
 *           responses:
 *              '200':
 *                  description: "[Count of deleted documents]"
 *              '500':
 *                  description: "Failed to delete document"
 */
router
  .route("/students")
  .get((req, res) => {
    StudentModel.find()
      .then(allStudents => {
        res.status(200);
        res.json(allStudents);
      })
      .catch(() => res.sendStatus(500));
  })

  .put((req, res) => res.sendStatus(501))

  .post((req, res) => {
    let student = new StudentModel();

    const firstName = req.body.firstName;
    const lastName = req.body.lastName;

    if (firstName === undefined || lastName === undefined) {
      res.sendStatus(400);
      return;
    }

    student.firstName = req.body.firstName;
    student.lastName = req.body.lastName;
    student
      .save()
      .then(savedStudent => {
        res.status(201);
        res.json(savedStudent);
      })
      .catch(err => res.sendStatus(500));
  })

  .delete((req, res) =>
    StudentModel.remove({})
      .then(deleted => {
        res.status(200);
        res.json(deleted);
      })
      .catch(() => res.sendStatus(500))
  );

/**
 * @swagger
 *  paths:
 *      /tests:
 *         get:
 *           summary: Return list of all tests
 *           responses:
 *              '200':
 *                  description: "List of all tests"
 *              '500':
 *                  description: "Database query failed"
 *         put:
 *           summary: Not implemented.
 *           responses:
 *              '501':
 *                  description: "Not implemented"
 *         post:
 *           summary: Add test to test collection
 *           parameters:
 *              -   in: body
 *                  name: test
 *                  description: The test to create.
 *                  schema:
 *                      type: object
 *                      required:
 *                          -   course
 *                          -   date
 *                      properties:
 *                          course:
 *                              type: string
 *                          date:
 *                              type: date
 *           responses:
 *              '201':
 *                  description: "[Saved document test]"
 *              '400':
 *                  description: "Bad request"
 *              '500':
 *                  description: "Failed to save document"
 *         delete:
 *           summary: Deletes all documents in the test collection
 *           responses:
 *              '200':
 *                  description: "[Count of deleted documents]"
 *              '500':
 *                  description: "Failed to delete document"
 */
router
  .route("/tests")
  .get((req, res) => {
    TestModel.find({})
      .then(alltests => res.json(alltests))
      .catch(() => res.sendStatus(500));
  })

  .put((req, res) => res.sendStatus(501))

  .post((req, res) => {
    let test = new TestModel();

    const course = req.body.course;
    const date = req.body.date;

    if (course === undefined || date === undefined) {
      res.sendStatus(400);
      return;
    }

    test.course = req.body.course;
    test.testDate = req.body.date;
    test
      .save()
      .then(savedtest => {
        res.status(201);
        res.json(savedtest);
      })
      .catch(err => res.sendStatus(500));
  })

  .delete((req, res) =>
    TestModel.remove({})
      .then(deleted => {
        res.status(200);
        res.json(deleted);
      })
      .catch(() => res.sendStatus(500))
  );

router.route("/tests/:id/enroll-student").post((req, res) => {
  const course = req.params.id;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;

  if (
    course === undefined ||
    firstName === undefined ||
    lastName === undefined
  ) {
    res.sendStatus(400);
    return;
  }

  TestModel.findById(course).then(test => {
    test.enrolledStudents.push({ firstName: firstName, lastName: lastName });
    test
      .save()
      .then(savedtest => {
        res.status(201);
        res.json(savedtest);
      })
      .catch(err => res.sendStatus(500));
  });
});

router.route("/tests/:testId/student/:studentId").post((req, res) => {
  const courseId = req.params.testId;
  const studentId = req.params.studentId;
  const grade = req.body.grade;
  const teacherFirstName = req.body.teacherFirstName;
  const teacherLastName = req.body.teacherLastName;

  if (
    courseId === undefined ||
    studentId === undefined ||
    grade === undefined ||
    teacherFirstName === undefined ||
    teacherLastName === undefined
  ) {
    res.sendStatus(400);
    return;
  }

  TestModel.findById(courseId).then(test => {
    let student = test.enrolledStudents.id(studentId);
    test.grades.push({
      student: {
        firstName: student.firstName,
        lastName: student.lastName
      },
      teacher: {
        firstName: teacherFirstName,
        lastName: teacherLastName
      },
      grade: grade,
      date: Date.now()
    });
    test
      .save()
      .then(savedtest => {
        res.status(201);
        res.json(savedtest);
      })
      .catch(err => res.sendStatus(500));
  });
});

/**
 * @swagger
 * paths:
 *      /tests/{id}:
 *          get:
 *              description: Return list of students
 *          put:
 *              description: Test
 *          post:
 *              description: test 2
 *          delete:
 *              description: test 3
 */
router
  .route("/tests/:id")
  .get((req, res) => res.send("Hello World GET!"))
  .put((req, res) => res.send("Hello World GET!"))
  .post((req, res) => res.send("Hello World GET!"))
  .delete((req, res) => res.send("Hello World GET!"));

module.exports = router;
