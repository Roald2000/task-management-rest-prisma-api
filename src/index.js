const express = require("express");
const app = express();

const cors = require("cors");
const createHttpError = require("http-errors");

app.use(cors());
app.use(express.json());

const { authenticateUser } = require("./services/jwt");
// Routers
const auth = require("./routes/auth");
const task = require("./routes/task");
const userInfo = require("./routes/user_info");
// Routes
app.use("/user", auth);
app.use("/user-info", authenticateUser, userInfo);
app.use("/task", authenticateUser, task);

app.use((req, res, next) => {
  next(createHttpError.NotFound("Invalid Route"));
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.statusCode || 500).json({
    status: err?.statusCode,
    message: err?.message,
  });
});

app.listen(process.env.SERVER_PORT, () => {
  console.log(process.env.SERVER_PORT);
});
