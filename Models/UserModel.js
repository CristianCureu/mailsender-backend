const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema({
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
    unique: true,
  },
  data: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", User);
