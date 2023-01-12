const router = require("express").Router();
const feedback = require("../Controllers/FeedbackControllers");
const verify = require("../middlewares/auth");

router.get("/", feedback.list);
router.get("/date", verify, feedback.listByDate);
router.post("/", feedback.create);

module.exports = router;
