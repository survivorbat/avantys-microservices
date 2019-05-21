const Payment = require("../model/payment").Payment;

/**
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @returns {Promise<*>}
 */
const getPayments = async (req, res, next) =>
  await Payment.find()
    .then(payments =>
      payments ? res.status(200).json(payments) : res.status(200).json([])
    )
    .catch(next);

/**
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @returns {Promise<*>}
 */
const getPayment = async ({ params: { id } }, res, next) =>
  await Payment.findById(id)
    .then(payment => (payment ? res.status(200).json(payment) : res.end(404)))
    .catch(next);

/**
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @returns {Promise<*>}
 */
const createPaymentDetails = async ({ body }, res, next) => {
  body.bank = {
    name: body["bank name"],
    IBAN: body["bank IBAN"],
    number: body["bank number"]
  };

  await new Payment(body, {})
    .save()
    .then(result => {
      rabbit.publish("ex.1", {
        routingKey: "paymentDetailsCreated",
        type: "paymentDetailsCreated",
        body: result
      });
      return res.redirect(303, "payments");
    })
    .catch(next => console.log(next));
};

module.exports = {
  createPaymentDetails,
  getPayments,
  getPayment
};
