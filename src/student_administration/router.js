const express = require("express");
const router = express.Router();
const studentController = require("./controller/students");

/**
 * @swagger
 * /api/v1/student_administration/students:
 *    get:
 *      description: Return list of students
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
      message: "404 not found" //To let the caller know his request doesn't have an endpoint
    })
    .end()
);

module.exports = router;
