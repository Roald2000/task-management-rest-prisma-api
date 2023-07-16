const { login, all, register } = require("../controller/controller.auth");
const { authenticateUser } = require("../services/jwt");

const router = require("express").Router();

router.post("/login", login);
router.post("/register", register);
router.delete("/logout");
router.get("/", authenticateUser, all);

module.exports = router;
