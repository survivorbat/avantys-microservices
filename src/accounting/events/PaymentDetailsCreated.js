const PaymentDetailsCreated = (payment, meta = null) => ({
    event: "PaymentDetailsCreated",
    data: payment,
    meta
  });
  
  module.exports = PaymentDetailsCreated;