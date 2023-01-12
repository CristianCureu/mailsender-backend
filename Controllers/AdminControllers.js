const Admin = require("../Models/AdminModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config");

const register = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const admin = await Admin.create({
      username: req.body.username,
      password: hashedPassword,
    });
    res.status(200).json({ success: true, message: admin });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const login = async (req, res) => {
  try {
    const admin = await Admin.findOne({ username: req.body.username });
    if (!admin)
      return res
        .status(400)
        .json({ success: false, message: "Username invalid!" });
    const validPassword = await bcrypt.compare(
      req.body.password,
      admin.password
    );
    if (!validPassword)
      return res
        .status(400)
        .json({ success: false, message: "Password invalid!" });
    const token = jwt.sign({ _id: admin._id }, config.SECRET_TOKEN);
    res.header("auth-toke", token).status(200).json({ success: true, token });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

module.exports = { register, login };
