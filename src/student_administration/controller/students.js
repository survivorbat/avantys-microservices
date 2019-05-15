const Student = require("../model/student").Student;
const RabbitMQ = require("../config/rabbitmq");

/**
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @returns {Promise<*>}
 */
const getStudents = async (req, res, next) =>
  await Student.find()
    .then(students => (students ? res.json(200, students) : res.json(200, [])))
    .catch(next);

/**
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @returns {Promise<*>}
 */
const getStudent = async ({ params: { id } }, res, next) =>
  await Student.findById(id)
    .then(student => (student ? res.json(200, student) : res.end(404)))
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
    .then(result => {
      if (!result) {
        next({ status: 500 });
      }
      RabbitMQ.res.redirect(303, "students");
    })
    .catch(next);

/**
 * TODO: Fix absolute url
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @returns {Promise<*>}
 */
const unregisterStudent = async ({ params: { id } }, res, next) =>
  await Student.findOneAndDelete(id)
    .then(() => res.redirect(303, "/api/v1/student_administration/students"))
    .catch(next);

module.exports = {
  getStudents,
  registerStudent,
  unregisterStudent,
  getStudent
};
