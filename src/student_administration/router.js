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
 */
router.get("/students", studentController.getStudents);

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
