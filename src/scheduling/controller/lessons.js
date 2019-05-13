const Lessons = require("../model/lesson").Lesson;

const getLessons = async (req, res, next) => {
  return await Lessons.find()
    .then(lessons => {
      if (!lessons) {
        return res.status(200).json([]);
      }

      res.status(200).json(lessons);
    })
    .catch(next);
};

const createLesson = async (req, res) => res.status(503).end();

const deleteLesson = async (req, res) => res.status(503).end();

module.exports = {
    getLessons,
    createLesson,
    deleteLesson
};
