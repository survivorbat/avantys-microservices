const express = require('express');
const router = express.Router();

var recruitingController = require('./controllers/recruiting');
var studentController = require('./controllers/student');

/**
 * @swagger
 * /students:
 *    get:
 *      description: Return list of students
 */

app.use('/', recruitingController);
app.use('/', studentController);

app.use('*', function (req, res) {
    res.status(400);
    res.json({
        'error': 'URL not found'
    });
});

router.get("/students", (req, res) => {
    return res.send("Hello World");
});

module.exports = router;