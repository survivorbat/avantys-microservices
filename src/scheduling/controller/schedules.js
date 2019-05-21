const Schedules = require("../model/schedule").Schedule;

const Module = require("../model/module").Module;
const Test = require("../model/test").TestModel;
const Teacher = require("../model/teacher").Teacher;

const getSchedules = async (req, res, next) => {
  return await Schedules.find()
    .then(schedules =>
      schedules ? res.status(200).json(schedules) : res.status(200).json([])
    )
    .catch(next);
};

const createSchedule = async ({ body }, res, next) => {
  if (body.teacherId !== null) {
    body.teacher = await Teacher.findOne({ _id: body.teacherId }).catch(error =>
      res.status(404).json(error)
    );
    body.teacherId = null;
  }
  if (body.moduleId !== null) {
    body.module = await Module.findOne({ _id: body.moduleId }).catch(error =>
      res.status(404).json(error)
    );
    body.moduleId = null;
  }
  if (body.testId !== null) {
    body.test = await Test.findOne({ _id: body.testId }).catch(error =>
      res.status(404).json(error)
    );
    body.testId = null;
  }
  console.log(body);
  await new Schedules(body, {})
    .save()
    .then(result => {
      res.redirect(303, "/api/v1/scheduling/schedules");
    })
    .catch(next);
};

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
