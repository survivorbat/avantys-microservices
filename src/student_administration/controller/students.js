const Student = require("../model/student").Student;

/**
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @returns {Promise<*>}
 */
const getStudents = async (req, res, next) =>
  await Student.find()
    .then(students =>
      students ? res.status(200).json(students) : res.status(200).json([])
    )
    .catch(next);

/**
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @returns {Promise<*>}
 */
const getStudent = async ({ params }, res, next) =>
  await Student.findById(params.id)
    .then(student =>
      student ? res.status(200).json(student) : res.status(404).end()
    )
    .catch(next);

/**
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @returns {Promise<*>}
 */
const registerStudent = async ({ body }, res, next) =>
  await new Student(body, {})
    .save()
    .then(result =>
      result ? res.status(303).redirect("students") : res.status(500)
    )
    .catch(next);

/**
 * TODO: Fix absolute url
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @returns {Promise<*>}
 */
const unregisterStudent = async ({ params }, res, next) =>
  await Student.findOneAndDelete(params.id)
    .then(() => res.redirect(303, "/api/v1/student_administration/students"))
    .catch(next);

module.exports = {
  getStudents,
  registerStudent,
  unregisterStudent,
  getStudent
};
