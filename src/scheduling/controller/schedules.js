const Schedules = require("../model/schedule").Schedule;

const getSchedules = async (req, res, next) => {
  return await Schedules.find()
    .then(schedules =>
      schedules ? res.status(200).json(schedules) : res.status(200).json([])
    )
    .catch(next);
};

const createSchedule = async ({ body }, res, next) =>
  await new Schedules(body, {})
    .save()
    .then(result => {
      res.redirect(303, "/api/v1/scheduling/schedules");
    })
    .catch(next);

const deleteSchedule = async ({ params: { id } }, res, next) =>
  await Schedules.findOneAndDelete(id)
    .then(result => {
      res.redirect(303, "/api/v1/scheduling/schedules");
    })
    .catch(next);

module.exports = {
  getSchedules,
  createSchedule,
  deleteSchedule
};
