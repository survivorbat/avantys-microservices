const mongoose = require("../config/db");
const Schema = mongoose.Schema;

const paymentSchema = new Schema({
  student: {
    type: Schema.Types.ObjectId,
    ref: 'Student'
  },
  payment: {
    type: Number,
    required: true
  },
  bank: {
    name: {
      type: String,
      require: true
    },
    IBAN: {
      type: String,
      require: true
    },
    number: {
      type: String,
      require: true
    }
  },
  issued: {
    type: Date,
    default: Date.now
  }
});

paymentSchema.pre('save', function (next) {
  if (!this.isNew) {
      this.issued = Date.now();
  }

  next();
});

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = {
  Payment,
  paymentSchema
};
