const Lessons = require("../model/lesson").Lesson;

const getLessons = async (req, res, next) => {
  return await Lessons.find()
    .then(lessons =>
      lessons ? res.status(200).json(lessons) : res.status(200).json([])
    )
    .catch(next);
};

const createLesson = async ({ body }, res, next) =>
  await new Lessons(body, {})
    .save()
    .then(result => {
      res.redirect(303, "/api/v1/scheduling/lessons");
    })
    .catch(next);

const deleteLesson = async ({ params: { id } }, res, next) =>
  await Lessons.findOneAndDelete(id)
    .then(result => {
      res.redirect(303, "/api/v1/scheduling/lessons");
    })
    .catch(next);

module.exports = {
  getLessons,
  createLesson,
  deleteLesson
};
