const Student = require("../model/student").Student;

const getStudents = async (req, res, next) => {
  return await Student.find()
    .then(students => {
      if (!students) {
        return res.status(200).json([]);
      }

      res.status(200).json(students);
    })
    .catch(next);
};

const registerStudent = async (req, res) => res.status(503).end();

const unregisterStudent = async (req, res) => res.status(503).end();

module.exports = {
  getStudents,
  registerStudent,
  unregisterStudent
};
