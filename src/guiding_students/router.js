const express = require("express");
const router = express.Router();
const {
  getAllNotes,
  getNotes,
  createNotes
} = require("./controller/notes");
const { notFound, catchError } = require("./controller/_error");

/**
 * @swagger
 * /notes:
 *    get:
 *      description: Return list of all notes
 *      produces:
 *        - application/json
 *      responses:
 *        200:
 *          description: List of all notes
 *        500:
 *          description: Something unexpected went wrong
 *        502:
 *          description: Service seems to be unavailable at this time
 */
router.get("/notes", getAllNotes);

/**
 * @swagger
 * /notes/{id}:
 *    get:
 *      description: Return specific notes
 *      produces:
 *        - application/json
 *      parameters:
 *        - name: id
 *          description: The ID of the notes
 *          required: true
 *          in: path
 *          type: string
 *      responses:
 *        302:
 *          description: Redirect to GET notes
 *        500:
 *          description: Something unexpected went wrong
 *        502:
 *          description: Service seems to be unavailable at this time
 *        404:
 *          description: No notes found by that ID
 */
router.get("/notes/:id", getNotes);

/**
 * @swagger
 * /notes:
 *    post:
 *      description: Create notes
 *      produces:
 *        - application/json
 *      parameters:
 *        - name: student
 *          description: The ID of the student
 *          required: true
 *          in: formData
 *          type: string
 *        - name: teacher
 *          description: The ID of the teacher
 *          required: true
 *          in: formData
 *          type: string
 *        - name: notes
 *          description: The contents of the notes
 *          required: true
 *          in: formData
 *          type: string
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
router.post("/notes", createNotes);

router.use(catchError);
router.get("*", notFound);

module.exports = router;