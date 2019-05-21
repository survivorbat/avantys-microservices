const Student = require("../model/student").Student;
const rabbit = require("../rabbit/rabbot");

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
const getStudent = async ({ params: { id } }, res, next) =>
  await Student.findById(id)
    .then(student => (student ? res.status(200).json(student) : res.end(404)))
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
      rabbit.publish("ex.1", {
        routingKey: "studentRegistered",
        type: "studentRegistered",
        body: result
      });
      return res.redirect(303, "students");
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
    .then(result => {
      rabbit.publish("ex.1", {
        routingKey: "studentUnregistered",
        type: "studentUnregistered",
        body: result
      });
      return res.redirect(303, "/api/v1/student_administration/students");
    })
    .catch(next);

/**
 * @param {string} className
 * @param {string} id
 * @param {Object} res
 * @param {Function} next
 * @returns {Promise<void>}
 */
const coupleStudentToClass = async (
  { body: { className }, params: { id } },
  res,
  next
) => {
  Student.findOneAndUpdate({ _id: id }, { class: className })
    .then(e => {
      e
        ? res.redirect(303, "/api/v1/student_administration/students")
        : res.status(500).end();
    })
    .catch(next);
};

module.exports = {
  getStudents,
  registerStudent,
  unregisterStudent,
  getStudent,
  coupleStudentToClass
};
