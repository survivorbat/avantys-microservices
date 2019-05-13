const express = require('express');
const router = express.Router();
const lessonController = require("./controller/lessons");

/**
 * @swagger
 * /lessons:
 *    get:
 *      description: Return list of lessons
 */
router.get("/lessons", lessonController.getLessons);

/**
 * @swagger
 * /lessons:
 *    post:
 *      description: Create new lesson
 */
router.post("/lessons", lessonController.createLesson);

/**
 * @swagger
 * /lessons:
 *    delete:
 *      description: Delete lesson
 */
router.delete("/lessons", lessonController.deleteLesson);

module.exports = router;