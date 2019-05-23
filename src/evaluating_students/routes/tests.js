const express = require("express");
const router = express.Router();
const GradeModel = require("../model/grade").GradeModel;
const StudentModel = require("../model/student").Student;
const TeacherModel = require("../model/teacher").TeacherModel;
const TestModel = require("../model/test").TestModel;
const rabbit = require("../rabbit/rabbot");

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
  .route("/")
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
      .then(savedtest => {
        rabbit.publish("ex.1", {
          routingKey: "studentExamined",
          type: "studentExamined",
          body: savedtest
        });
        res.status(201).json(savedtest);
      })
      .catch(err => res.sendStatus(500));
  })

  .delete((req, res) =>
    TestModel.remove({})
      .then(deleted => res.json(200, deleted))
      .catch(() => res.sendStatus(500))
  );

/**
 * @swagger
 * /tests/{_id}/enroll-student:
 *    post:
 *      summary: Add student to test
 *      description: add student to test
 *      produces:
 *        - application/json
 *      parameters:
 *      - name: _id
 *        description: The id of the test
 *        required: true
 *        in: path
 *        type: string
 *      - name: studentId
 *        description: The student's id
 *        required: true
 *        in: formData
 *        type: string
 *      responses:
 *        201:
 *          description: Return test
 *        400:
 *          description: Something unexpected went wrong
 */
router
  .route("/:_id/enroll-student")
  .post(async ({ body: { studentId }, params: { _id } }, res) => {
    if (!_id || !studentId) {
      return res.sendStatus(400);
    }
    const student = await StudentModel.findOne({ _id: studentId }).catch(
      error => res.status(401).json(error)
    );
    TestModel.findById(_id).then(test => {
      test.enrolledStudents.push(student);
      test
        .save()
        .then(savedtest => res.status(201).json(savedtest))
        .catch(err => res.sendStatus(500));
    });
  });

/**
 * @swagger
 * /tests/{_id}:
 *    post:
 *      summary: Add student to participated list
 *      produces:
 *        - application/json
 *      parameters:
 *      - name: _id
 *        description: The id of the test
 *        required: true
 *        in: path
 *        type: string
 *      - name: studentId
 *        description: The student's id
 *        required: true
 *        in: formData
 *        type: string
 *      responses:
 *        201:
 *          description: Return test
 *        400:
 *          description: Something unexpected went wrong
 */

router
  .route("/:testId")
  .post(async ({ params: { testId }, body: { studentId } }, res) => {
    if (!testId || !studentId) {
      return res.sendStatus(400);
    }
    const student = await StudentModel.findOne({ _id: studentId }).catch(
      error => res.status(401).json(error)
    );
    TestModel.findById(testId).then(test => {
      test.participatedStudents.push(student);
      test
        .save()
        .then(savedtest => {
          rabbit.publish("ex.1", {
            routingKey: "studentExamined",
            type: "studentExamined",
            body: savedtest
          });
          res.status(201).json(savedtest);
        })
        .catch(err => res.status(500).send(err));
    });
  });

/**
 * @swagger
 * /tests/{_id}/student/{studentId}:
 *    post:
 *      summary: Grade student
 *      produces:
 *        - application/json
 *      parameters:
 *      - name: _id
 *        description: The id of the test
 *        required: true
 *        in: path
 *        type: string
 *      - name: studentId
 *        description: The student's id
 *        required: true
 *        in: path
 *        type: string
 *      - name: grade
 *        description: The grade of the student
 *        required: true
 *        in: formData
 *        type: number
 *      - name: teacherId
 *        description: The teacher that graded the student
 *        required: true
 *        in: formData
 *        type: string
 *      responses:
 *        201:
 *          description: Return graded test
 *        400:
 *          description: Something unexpected went wrong
 */

router
  .route("/:testId/student/:studentId")
  .post(
    async (
      { params: { testId, studentId }, body: { grade, teacherId } },
      res
    ) => {
      if (!testId || !studentId || !grade || !teacherId) {
        return res.sendStatus(400);
      }
      const student = await StudentModel.findOne({ _id: studentId }).catch(
        error => res.status(401).json(error)
      );
      const teacher = await TeacherModel.findOne({ _id: teacherId }).catch(
        error => res.status(401).json(error)
      );
      TestModel.findById(testId).then(test => {
        test.grades.push({
          student,
          teacher,
          grade,
          date: Date.now()
        });
        test
          .save()
          .then(savedtest => {
            rabbit.publish("ex.1", {
              routingKey: "studentGraded",
              type: "studentGraded",
              body: savedtest
            });
            res.status(201).json(savedtest);
          })
          .catch(err => res.sendStatus(500));
      });
    }
  );

module.exports = router;
