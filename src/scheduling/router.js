const express = require("express");
const router = express.Router();
const scheduleController = require("./controller/schedules");
const { notFound, catchError } = require("./controller/_error");

/**
 * @swagger
 * /schedules:
 *    get:
 *      description: Return list of lessons
 *      responses:
 *              '200':
 *                  description: "List of all teachers"
 */
router.get("/schedules", scheduleController.getSchedules);

/**
 * @swagger
 * /schedules:
 *    post:
 *      description: Create new lesson
 *      parameters:
 *        -   in: body
 *            name: lesson
 *            description: The lesson to create.
 *            schema:
 *              type: object
 *              required:
 *                -   teacherId
 *                -   testId
 *                -   moduleId
 *                -   class
 *                -   startDatetime
 *                -   endDatetime
 *              properties:
 *                teacherId:
 *                  type: string
 *                testId:
 *                  type: string
 *                moduleId:
 *                  type: string
 *                class:
 *                  type: string
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
router.post("/schedules", scheduleController.createSchedule);

/**
 * @swagger
 * /schedules/:id:
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
router.delete("/schedules/:id", scheduleController.deleteSchedule);

router.use(catchError);
router.get("*", notFound);

module.exports = router;
