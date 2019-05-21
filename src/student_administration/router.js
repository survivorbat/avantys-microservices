const express = require("express");
const router = express.Router();
const {
  getStudent,
  getStudents,
  registerStudent,
  unregisterStudent,
  coupleStudentToClass
} = require("./controller/students");
const {
  getModule,
  getModules,
  registerModule,
  unregisterModule
} = require("./controller/modules");

const { notFound, catchError } = require("./controller/_error");

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
router.get("/students", getStudents);

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
router.get("/students/:id", getStudent);

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
router.post("/students", registerStudent);

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
router.delete("/students/:id", unregisterStudent);

/**
 * @swagger
 * /students/{id}/class:
 *    put:
 *      description: Couple student with class
 *      produces:
 *        - application/json
 *      parameters:
 *      - name: id
 *        type: string
 *        description: The Student ID
 *        required: true
 *        in: path
 *      - name: className
 *        description: Class name
 *        required: true
 *        in: formData
 *        type: string
 *      responses:
 *        302:
 *          description: Redirect to GET classes
 *        500:
 *          description: Something unexpected went wrong
 *        502:
 *          description: Service seems to be unavailable at this time
 *        503:
 *          description: Method has not yet been implemented yet
 */
router.put("/students/:id/class", coupleStudentToClass);

/**
 * @swagger
 * /modules:
 *    get:
 *      description: Return list of modules
 *      produces:
 *        - application/json
 *      responses:
 *        200:
 *          description: List of modules
 *        500:
 *          description: Something unexpected went wrong
 *        502:
 *          description: Service seems to be unavailable at this time
 */
router.get("/modules", getModules);

/**
 * @swagger
 * /modules/{id}:
 *    get:
 *      description: Return module
 *      produces:
 *        - application/json
 *      parameters:
 *       - name: id
 *         description: The module id
 *         required: true
 *         in: path
 *         type: string
 *      responses:
 *        302:
 *          description: Redirect to GET modules
 *        500:
 *          description: Something unexpected went wrong
 *        502:
 *          description: Service seems to be unavailable at this time
 *        404:
 *          description: No module found by that ID
 */
router.get("/modules/:id", getModule);

/**
 * @swagger
 * /modules:
 *    post:
 *      description: Register module
 *      produces:
 *        - application/json
 *      parameters:
 *      - name: name
 *        description: The module's ame
 *        required: true
 *        in: formData
 *        type: string
 *      responses:
 *        302:
 *          description: Redirect to GET modules
 *        500:
 *          description: Something unexpected went wrong
 *        502:
 *          description: Service seems to be unavailable at this time
 *        503:
 *          description: Method has not yet been implemented yet
 */
router.post("/modules", registerModule);

/**
 * @swagger
 * /modules/{id}:
 *    delete:
 *      description: Unregister module
 *      produces:
 *        - application/json
 *      parameters:
 *       - name: id
 *         description: The ID of the student
 *         required: true
 *         in: path
 *         type: string
 *      responses:
 *        302:
 *          description: Redirect to GET modules
 *        500:
 *          description: Something unexpected went wrong
 *        502:
 *          description: Service seems to be unavailable at this time
 *        503:
 *          description: Method has not yet been implemented yet
 */
router.delete("/modules/:id", unregisterModule);

router.use(catchError);
router.get("*", notFound);

module.exports = router;
