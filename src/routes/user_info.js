const {
  getUserInfo,
  createUserInfo,
} = require("../controller/controller.user_info");

const router = require("express").Router();

router.get("/", getUserInfo);

router.post("/create", createUserInfo);

module.exports = router;
