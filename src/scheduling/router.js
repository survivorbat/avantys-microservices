const express = require('express');
const router = express.Router();

/**
 * @swagger
 * /students:
 *    get:
 *      description: Return list of students
 */
router.get("/students", (req, res) => {
    return res.send("Hello");
});

module.exports = router;