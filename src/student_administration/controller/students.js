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

module.exports = {
  getStudents
};
