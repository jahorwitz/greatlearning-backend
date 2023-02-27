const helmet = require("helmet");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { errors } = require("celebrate");
const taskRouter = require("./routes/tasks");
const { ResourceNotFoundError } = require("./errors/ResourceNotFoundError");

const app = express();
app.use(cors());
app.options("*", cors());
app.use(helmet());
app.use(express.json());
mongoose.connect("mongodb://localhost:27017/tasksdb");

require("dotenv").config();

const { PORT = 3001 } = process.env;

app.use("/tasks", taskRouter);

app.use("/", (req, res) => {
  throw new ResourceNotFoundError("Requested resource not found");
});

app.use(errors());
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message:
      statusCode === 500 ? "An error has occured on the server" : message,
  });
});

app.listen(PORT);
