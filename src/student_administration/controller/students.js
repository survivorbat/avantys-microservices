const Student = require("../model/student").Student;

const getStudents = async (req, res, next) => {
  return await Student.find()
    .then(students => {
      if (!students) {
        return res.status(200).json([]);
      }

      return res.status(200).json(students);
    })
    .catch(next);
};

const getStudent = async (req, res, next) => {
    return await Student.findById(req.param.id)
        .then(student => {
            if (!student) {
                return res.status(404).end();
            }

            res.status(200).json(student)
        }
    )
}

const registerStudent = async (req, res) => res.status(503).end();

const unregisterStudent = async (req, res) => res.status(503).end();

module.exports = {
  getStudents,
  registerStudent,
  unregisterStudent,
    getStudent
};
