const router = require("express").Router();
const user = require("../Controllers/UserControllers");

router.get("/", user.list);
router.post("/", user.create);

module.exports = router;
