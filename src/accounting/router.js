const express = require("express");
const router = express.Router();
const {
  getPayments,
  getPayment,
  createPaymentDetails
} = require("./controller/payments");
const { notFound, catchError } = require("./controller/_error");

/**
 * @swagger
 * /payments:
 *    get:
 *      description: Return list of all payments
 *      produces:
 *        - application/json
 *      responses:
 *        200:
 *          description: List of all payments
 *        500:
 *          description: Something unexpected went wrong
 *        502:
 *          description: Service seems to be unavailable at this time
 */
router.get("/payments", getPayments);

/**
 * @swagger
 * /payments/{id}:
 *    get:
 *      description: Return specific payment
 *      produces:
 *        - application/json
 *      parameters:
 *        - name: id
 *          description: The ID of the payment
 *          required: true
 *          in: path
 *          type: string
 *      responses:
 *        302:
 *          description: Redirect to GET payment
 *        500:
 *          description: Something unexpected went wrong
 *        502:
 *          description: Service seems to be unavailable at this time
 *        404:
 *          description: No payment found by that ID
 */
router.get("/payments/:id", getPayment);

/**
 * @swagger
 * /payments:
 *    post:
 *      description: Create payments
 *      produces:
 *        - application/json
 *      parameters:
 *        - name: student
 *          description: The ID of the student
 *          required: true
 *          in: formData
 *          type: string
 *        - name: payment
 *          description: The amount of college money that was paid
 *          required: true
 *          in: formData
 *          type: string
 *        - name: bank name
 *          description: The name of the bank
 *          required: true
 *          in: formData
 *          type: string
 *        - name: bank IBAN
 *          description: The IBAN of the bank
 *          required: true
 *          in: formData
 *          type: string
 *        - name: bank number
 *          description: The bank number of the student
 *          required: true
 *          in: formData
 *          type: string
 *      responses:
 *        302:
 *          description: Redirect to GET payments
 *        500:
 *          description: Something unexpected went wrong
 *        502:
 *          description: Service seems to be unavailable at this time
 *        503:
 *          description: Method has not yet been implemented yet
 */
router.post("/payments", createPaymentDetails);

router.use(catchError);
router.get("*", notFound);

module.exports = router;
