const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Feedback = new Schema({
  nume: {
    required: true,
    type: String,
  },
  email: {
    required: true,
    type: String,
    validate: {
      validator: (email) => {
        const regex = new RegExp(process.env.REGEX_EMAIL, "i");
        return regex.test(email);
      },
      message: () => "Please fill a valid Email Address",
    },
  },
  q1: {
    required: true,
    type: Number,
  },
  q2: {
    required: true,
    type: Number,
  },
  q3: {
    required: true,
    type: String,
  },
  data: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Feedback", Feedback);
