const Feedback = require("../Models/FeedbackModel");
const User = require("../Models/UserModel");
const mail = require("../mail");

const list = async (req, res) => {
  try {
    const data = await Feedback.find();
    const count = await Feedback.find().count();
    res.status(200).json({ success: true, data, count });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

const listByDate = async (req, res) => {
  try {
    const { start, end } = req.query;
    const data = await Feedback.find({
      data: {
        $gte: start,
        $lt: end,
      },
    });
    res.status(200).json({ succes: true, data });
  } catch (err) {
    res.status(400).json({
      succes: false,
      message: err.message,
    });
  }
};

const create = async (req, res) => {
  try {
    const data = await Feedback.create(req.body);
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      await User.create({
        nume: req.body.nume,
        email: req.body.email,
      });
      await mail.sendWelcomeEmail(req.body.email, { nume: req.body.nume });
    }
    await mail.sendFeedbackEmail(req.body.email, { nume: req.body.nume });
    res.status(201).json({ succes: true, data });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

module.exports = { list, listByDate, create };
