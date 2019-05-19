const express = require("express");
const router = express.Router();
const lessonController = require("./controller/lessons");
const { notFound, catchError } = require("./controller/_error");

/**
 * @swagger
 * /lessons:
 *    get:
 *      description: Return list of lessons
 *      responses:
 *              '200':
 *                  description: "List of all teachers"
 */
router.get("/lessons", lessonController.getLessons);

/**
 * @swagger
 * /lessons:
 *    post:
 *      description: Create new lesson
 *      parameters:
 *        -   in: body
 *            name: lesson
 *            description: The lesson to create.
 *            schema:
 *              type: object
 *              required:
 *                -   studentId
 *                -   classId
 *                -   moduleId
 *                -   startDatetime
 *                -   endDatetime
 *              properties:
 *                studentId:
 *                  type: number
 *                classId:
 *                  type: number
 *                moduleId:
 *                  type: number
 *                startDatetime:
 *                  type: string
 *                  format: date-time
 *                endDatetime:
 *                  type: string
 *                  format: date-time
 *      responses:
 *        302:
 *          description: Redirect to GET students
 *        500:
 *          description: Something unexpected went wrong
 *        502:
 *          description: Service seems to be unavailable at this time
 *        503:
 *          description: Method has not yet been implemented yet`
 */
router.post("/lessons", lessonController.createLesson);

/**
 * @swagger
 * /lessons/:id:
 *    delete:
 *      description: Delete lesson
 *      produces:
 *        - application/json
 *      parameters:
 *       - name: id
 *         description: The Lesson Number of the lesson
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
router.delete("/lessons/:id", lessonController.deleteLesson);

router.use(catchError);
router.get("*", notFound);

module.exports = router;
