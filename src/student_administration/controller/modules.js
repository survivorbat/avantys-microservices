const Module = require("../model/module").Module;
const rabbit = require("../rabbit/rabbot");

/**
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @returns {Promise<*>}
 */
const getModules = async (req, res, next) =>
  await Module.find()
    .then(modules =>
      modules ? res.status(200).json(modules) : res.status(200).json([])
    )
    .catch(next);

/**
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @returns {Promise<*>}
 */
const getModule = async ({ params: { id } }, res, next) =>
  await Module.findById(id)
    .then(module => (module ? res.status(200).json(module) : res.end(404)))
    .catch(next);

/**
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @returns {Promise<*>}
 */
const registerModule = async ({ body }, res, next) =>
  await new Module(body, {})
    .save()
    .then(result => {
      rabbit.publish("ex.1", {
        routingKey: "moduleRegistered",
        type: "moduleRegistered",
        body: result
      });
      // return res.redirect(303, "modules");
      return res.status(200).end();
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
const unregisterModule = async ({ params: { id } }, res, next) =>
  await Module.findOneAndDelete(id)
    .then(result => {
      return res.redirect(303, "/api/v1/module_administration/modules");
    })
    .catch(next);

module.exports = {
  getModules,
  registerModule,
  unregisterModule,
  getModule
};
