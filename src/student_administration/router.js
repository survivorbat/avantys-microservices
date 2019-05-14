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
router.get("/students/:id", studentController.getStudent);

/**
 * @swagger
 * /students:
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

router.use((error, req, res, next) => {
  if (error.name === "ValidationError" || error.name === "CastError") {
    error.status = 422;
    error.message =
      "Your request was either malformed or contained invalid input. Please consult the documentation.";
  }
  res
    .status(error.status || 500)
    .send({
      message: error.message,
      code: error.code,
      name: error.name,
      status: error.status
    })
    .end();
});

router.get("*", (req, res) =>
  res
    .status(404)
    .send({
      message: "404 not found"
    })
    .end()
);

module.exports = router;
