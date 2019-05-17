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

// const createLesson = async ({ body }, req, res) => res.status(200).json(body);

const createLesson = async ({ body }, res, next) =>
  await new Lessons(body, {})
    .save()
    .then(result => {
      return res.redirect(303, "/api/v1/scheduling/lessons");
    })
    .catch(next);

// const deleteLesson = async (req, res) => res.status(503).end();
const deleteLesson = async ({ params: { id } }, res, next) =>
  await Lessons.findOneAndDelete(id)
    .then(result => {
      return res.redirect(303, "/api/v1/scheduling/lessons");
    })
    .catch(next);

module.exports = {
  getLessons,
  createLesson,
  deleteLesson
};
