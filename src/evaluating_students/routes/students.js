const express = require("express");
const router = express.Router();
const GradeModel = require("../model/grade").GradeModel;
const StudentModel = require("../model/student").StudentModel;
const TeacherModel = require("../model/teacher").TeacherModel;
const TestModel = require("../model/test").TestModel;

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
  .route("/")
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

module.exports = router;
