const Notes = require("../model/notes").Notes;
const rabbit = require("rabbot");

/**
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @returns {Promise<*>}
 */
const getAllNotes = async (req, res, next) =>
  await Notes.find()
    .then(notes =>
      notes ? res.status(200).json(notes) : res.status(200).json([])
    )
    .catch(next);

/**
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @returns {Promise<*>}
 */
const getNotes = async ({ params: { id } }, res, next) =>
  await Notes.findById(id)
    .then(notes => (notes ? res.status(200).json(notes) : res.end(404)))
    .catch(next);

/**
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @returns {Promise<*>}
 */
const createNotes = async ({ body }, res, next) =>
  await new Notes(body, {})
    .save()
    .then(result => {
      rabbit.publish("ex.1", {
        routingKey: "notesCreated",
        type: "notesCreated",
        body: result
      });
      return res.redirect(303, "notes");
    })
    .catch(next => console.log(next));

module.exports = {
  createNotes,
  getAllNotes,
  getNotes
};
