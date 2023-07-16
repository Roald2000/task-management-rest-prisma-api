const {
  create,
  all,
  update,
  deleteTask,
  searchTask,
} = require("../controller/controller.task");
const { authenticateUser } = require("../services/jwt");

const router = require("express").Router();

router.put("/update/:t_id", update);
router.delete("/delete/:t_id", deleteTask);

router.post("/create", authenticateUser, create);
router.get("/", all);
router.get("/search/:search", searchTask);

module.exports = router;
