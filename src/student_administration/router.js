const express = require("express");
const router = express.Router();
const studentController = require("./controller/students");

/**
 * @swagger
 * /students:
 *    get:
 *      description: Return list of students
 *      produces:
 *        - application/json
 *      responses:
 *        200:
 *          description: List of students
 *        500:
 *          description: Something unexpected went wrong
 *        502:
 *          description: Service seems to be unavailable at this time
 */
router.get("/students", studentController.getStudents);

/**
 * @swagger
 * /students/{id}:
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
 *        302:
 *          description: Redirect to GET students
 *        500:
 *          description: Something unexpected went wrong
 *        502:
 *          description: Service seems to be unavailable at this time
 *        404:
 *          description: No student found by that ID
 */
router.get("/students/{id}", studentController.getStudent);

/**
 * @swagger
 * /students:
 *    post:
 *      description: Register student
 *      produces:
 *        - application/json
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *              schema:
     *              - name: firstName
     *                description: First name of the student
     *                required: true
     *                type: string
     *              - name: lastName
     *                description: Last name of the student
     *                required: true
     *                type: string
 *      responses:
 *        302:
 *          description: Redirect to GET students
 *        500:
 *          description: Something unexpected went wrong
 *        502:
 *          description: Service seems to be unavailable at this time
 *        503:
 *          description: Method has not yet been implemented yet
 */
router.post("/students", studentController.registerStudent);

/**
 * @swagger
 * /students/{id}:
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
 *        302:
 *          description: Redirect to GET students
 *        500:
 *          description: Something unexpected went wrong
 *        502:
 *          description: Service seems to be unavailable at this time
 *        503:
 *          description: Method has not yet been implemented yet
 */
router.delete("/students/:id", studentController.unregisterStudent);

router.use((error, req, res) =>
  res
    .status(error.status || 500)
    .send({
      message: error.message,
      code: error.code,
      name: error.name,
      status: error.status
    })
    .end()
);

router.get("*", (req, res) =>
  res
    .status(404)
    .send({
      message: "404 not found"
    })
    .end()
);

module.exports = router;
