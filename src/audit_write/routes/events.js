const express = require("express");
const router = express.Router();
const eventModel = require("../model/event");
const rabbit = require("../rabbit/rabbot");

/**
 * @swagger
 *  paths:
 *      /events:
 *         get:
 *           summary: Return list of all events
 *           responses:
 *              '200':
 *                  description: "List of all events"
 *              '500':
 *                  description: "Database query failed"
 *         put:
 *           summary: Not implemented.
 *           responses:
 *              '501':
 *                  description: "Not implemented"
 *         post:
 *           summary: Add event to event collection
 *           parameters:
 *              -   in: body
 *                  name: event
 *                  description: The event to create.
 *                  schema:
 *                      type: object
 *                      required:
 *                          -   course
 *                          -   date
 *                      properties:
 *                          course:
 *                              type: string
 *                          date:
 *                              type: date
 *           responses:
 *              '201':
 *                  description: "[Saved document event]"
 *              '400':
 *                  description: "Bad request"
 *              '500':
 *                  description: "Failed to save document"
 *         delete:
 *           summary: Deletes all documents in the event collection
 *           responses:
 *              '200':
 *                  description: "[Count of deleted documents]"
 *              '500':
 *                  description: "Failed to delete document"
 */
router
  .route("/")
  .get((req, res) => {
      res.redirect(303, "/api/v1/audit_read/events");
  })

  .put((req, res) => res.sendStatus(501))

  .post((req, res) => res.sendStatus(501))

  .delete((req, res) => res.sendStatus(501))

module.exports = router;
