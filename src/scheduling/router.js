const express = require('express');
const router = express.Router();

/**
 * @swagger
 * /lessons:
 *    get:
 *      description: Return list of lessons
 */
router.get("/lessons", (req, res) => {
    return res.send("Hello");
});

/**
 * @swagger
 * /lessons:
 *    post:
 *      description: Create new lesson
 */
router.post("/lessons", (req, res) => {
    return res.send("Hello");
});

/**
 * @swagger
 * /lessons:
 *    delete:
 *      description: Delete lesson
 */
router.delete("/lessons", (req, res) => {
    return res.send("Hello");
});

module.exports = router;