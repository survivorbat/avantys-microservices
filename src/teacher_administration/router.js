const express = require("express");
const router = express.Router();
const {
  getTeacher,
  getTeachers,
  registerTeacher,
  unregisterTeacher
} = require("./controller/teacher");
const { notFound, catchError } = require("./controller/_error");

/**
 * @swagger
 * /teachers:
 *    get:
 *      description: Return list of teachers
 *      produces:
 *        - application/json
 *      responses:
 *        200:
 *          description: List of teachers
 *        500:
 *          description: Something unexpected went wrong
 *        502:
 *          description: Service seems to be unavailable at this time
 */
router.get("/teachers", getTeachers);

/**
 * @swagger
 * /teachers/{id}:
 *    get:
 *      description: Return teacher
 *      produces:
 *        - application/json
 *      parameters:
 *       - name: id
 *         description: The teacher Number of the teacher
 *         required: true
 *         in: path
 *         type: string
 *      responses:
 *        302:
 *          description: Redirect to GET teachers
 *        500:
 *          description: Something unexpected went wrong
 *        502:
 *          description: Service seems to be unavailable at this time
 *        404:
 *          description: No teacher found by that ID
 */
router.get("/teachers/:id", getTeacher);

/**
 * @swagger
 * /teachers:
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
 *      responses:
 *        302:
 *          description: Redirect to GET teachers
 *        500:
 *          description: Something unexpected went wrong
 *        502:
 *          description: Service seems to be unavailable at this time
 *        503:
 *          description: Method has not yet been implemented yet
 */
router.post("/teachers", registerTeacher);

/**
 * @swagger
 * /teachers/{id}:
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
 *        302:
 *          description: Redirect to GET teachers
 *        500:
 *          description: Something unexpected went wrong
 *        502:
 *          description: Service seems to be unavailable at this time
 *        503:
 *          description: Method has not yet been implemented yet
 */
router.delete("/teachers/:id", unregisterTeacher);

router.use(catchError);
router.get("*", notFound);

module.exports = router;
