const express = require("express");
const router = express.Router();
const Event = require("../model/event");

/**
 * @swagger
 *  paths:
 *      /events:
 *         get:
 *           summary: Return list of all events
 *           responses:
 *              '200':
 *                  description: "List of all tests"
 *              '500':
 *                  description: "Database query failed"
 */
router.route("/events").get((req, res) => {
  Event.find()
    .then(allevents => res.status(200).json(allevents))
    .catch(() => res.sendStatus(500));
});

module.exports = router;
