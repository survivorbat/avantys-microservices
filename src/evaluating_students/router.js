const express = require("express");
const router = express.Router();
const GradeModel = require("./model/grade").GradeModel;
const StudentModel = require("./model/student").StudentModel;
const TeacherModel = require("./model/teacher").TeacherModel;
const TestModel = require("./model/test").TestModel;

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
    TeacherModel.find()
      .then(allTeachers => res.json(200, allTeachers))
      .catch(() => res.sendStatus(500));
  })

  .put((req, res) => res.sendStatus(501))

  .post(({ body: { firstName, lastName } }, res) => {
    if (!firstName || !lastName) {
      return res.sendStatus(400);
    }

    const teacher = new TeacherModel({ firstName, lastName }, {});
    teacher
      .save()
      .then(savedTeacher => res.json(201, savedTeacher))
      .catch(err => res.sendStatus(500));
  })

  .delete((req, res) =>
    TeacherModel.remove({})
      .then(deleted => res.json(200, deleted))
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
      .then(allStudents => res.json(200, allStudents))
      .catch(() => res.sendStatus(500));
  })

  .put((req, res) => res.sendStatus(501))

  .post(({ body: { firstName, lastName } }, res) => {
    if (!firstName || !lastName) {
      return res.sendStatus(400);
    }

    const student = new StudentModel({ firstName, lastName }, {});

    student
      .save()
      .then(savedStudent => res.json(201, savedStudent))
      .catch(err => res.sendStatus(500));
  })

  .delete((req, res) =>
    StudentModel.remove({})
      .then(deleted => res.json(200, deleted))
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
      .then(alltests => res.json(200, alltests))
      .catch(() => res.sendStatus(500));
  })

  .put((req, res) => res.sendStatus(501))

  .post(({ body: { course, date } }, res) => {
    if (!course || !date) {
      return res.sendStatus(400);
    }

    const test = new TestModel({ course, date }, {});
    test
      .save()
      .then(savedtest => res.json(201, savedtest))
      .catch(err => res.sendStatus(500));
  })

  .delete((req, res) =>
    TestModel.remove({})
      .then(deleted => res.json(200, deleted))
      .catch(() => res.sendStatus(500))
  );

router
  .route("/tests/:id/enroll-student")
  .post(({ body: { firstName, lastName }, params: { course } }, res) => {
    if (!course || !firstName || !lastName) {
      return res.sendStatus(400);
    }

    TestModel.findById(course).then(test => {
      test.enrolledStudents.push({ firstName, lastName });
      test
        .save()
        .then(savedtest => res.json(201, savedtest))
        .catch(err => res.sendStatus(500));
    });
  });

router
  .route("/tests/:testId/student/:studentId")
  .post(
    (
      {
        params: { testId, studentId, courseId },
        body: { grade, teacherFirstName, teacherLastName }
      },
      res
    ) => {
      if (
        !courseId ||
        !studentId ||
        !grade ||
        !teacherFirstName ||
        !teacherLastName
      ) {
        return res.sendStatus(400);
      }

      TestModel.findById(courseId).then(test => {
        const { firstName, lastName } = test.enrolledStudents.id(studentId);
        test.grades.push({
          student: {
            firstName,
            lastName
          },
          teacher: {
            firstName: teacherFirstName,
            lastName: teacherLastName
          },
          grade,
          date: Date.now()
        });
        test
          .save()
          .then(savedtest => res.json(201, savedtest))
          .catch(err => res.sendStatus(500));
      });
    }
  );

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
