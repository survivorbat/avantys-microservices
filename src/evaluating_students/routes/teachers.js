const express = require("express");
const router = express.Router();
const GradeModel = require("../model/grade").GradeModel;
const StudentModel = require("../model/student").StudentModel;
const TeacherModel = require("../model/teacher").TeacherModel;
const TestModel = require("../model/test").TestModel;
const rabbit = require("../rabbit/rabbot");
// const handler = require("./rabbit/messageHandler");

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
  .route("/")
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

module.exports = router;
