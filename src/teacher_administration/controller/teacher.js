const Teacher = require("../model/teacher").Teacher;
const sendToQueue = require("../config/rabbitmq").connectAndSend;
const TeacherRegistered = require("../events/TeacherRegistered");
const TeacherUnregistered = require("../events/TeacherUnregistered");
const rabbit = require("../rabbit/rabbot");

/**
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @returns {Promise<*>}
 */
const getTeachers = async (req, res, next) =>
  await Teacher.find()
    .then(teacher =>
      teacher ? res.status(200).json(teacher) : res.status(200).json([])
    )
    .catch(next);

/**
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @returns {Promise<*>}
 */
const getTeacher = async ({ params: { id } }, res, next) =>
  await Teacher.findById(id)
    .then(teacher => (teacher ? res.status(200).json(teacher) : res.end(404)))
    .catch(next);

/**
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @returns {Promise<*>}
 */
const registerTeacher = async ({ body }, res, next) =>
  await new Teacher(body, {})
    .save()
    .then(result => {
      rabbit.publish("ex.1", {
        routingKey: "teacherRegistered",
        type: "teacherRegistered",
        body: result
      });
      return res.redirect(303, "teachers");
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
const unregisterTeacher = async ({ params: { id } }, res, next) =>
  await Teacher.findOneAndDelete(id)
    .then(result => {
      rabbit.publish("ex.1", {
        routingKey: "teacherUnregistered",
        type: "teacherUnregistered",
        body: result
      });
      return res.redirect(303, "/api/v1/teacher_administration/teachers");
    })
    .catch(next);

module.exports = {
  getTeachers,
  registerTeacher,
  unregisterTeacher,
  getTeacher
};
