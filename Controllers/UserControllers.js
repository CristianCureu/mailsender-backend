const User = require("../Models/UserModel");
const mail = require("../mail");

const list = async (req, res) => {
  try {
    const data = await User.find();
    const count = await User.find().count();
    res.status(200).json({ success: true, data, count });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

const create = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      const data = await User.create(req.body);
      await mail.sendWelcomeEmail(req.body.email, { nume: req.body.nume });
      res.status(200).json({ succes: true, data });
    } else {
      res.status(500).json({
        success: false,
        message: "Aceasta adresa de email este deja abonata!",
      });
    }
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

module.exports = { list, create };
