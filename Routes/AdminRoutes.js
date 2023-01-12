const router = require("express").Router();
const admin = require("../Controllers/AdminControllers");

router.post("/login", admin.login);
router.post("/register", admin.register);

module.exports = router;
