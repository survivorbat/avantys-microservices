const express = require("express");
const router = express.Router();

const Event = require("../model/event");
const rabbit = require("../rabbit/rabbot");

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

router
  .route("/")
  .get((req, res) => {
    Event.find({})
      .then(allevents => res.json(200, allevents))
      .catch(() => res.sendStatus(500));
  });


module.exports = router;
