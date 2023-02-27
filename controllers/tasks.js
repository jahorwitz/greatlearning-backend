const { ResourceNotFoundError } = require("../errors/ResourceNotFoundError");
const { BadRequestError } = require("../errors/BadRequestError");
const { taskModel } = require("../models/task");

const getAllTasks = (req, res, next) => {
  taskModel
    .find({})
    .then((tasks) => res.send(tasks))
    .catch((err) => next(err));
};

const createTask = (req, res, next) => {
  const { title, description, details } = req.body;

  taskModel
    .create({ title, description, details })
    .then((task) => res.send(task))
    .catch(() => next(new BadRequestError("Invalid data submitted")));
};

const deleteTask = (req, res, next) => {
  taskModel
    .findById(req.params.taskId)
    .orFail()
    .then(() => {
      taskModel
        .findByIdAndRemove(req.params.taskId)
        .orFail()
        .then(() => res.send({ message: "Task deleted" }));
    })
    .catch((err) => {
      err.name === "DocumentNotFoundError"
        ? next(new ResourceNotFoundError("Could not find requested task"))
        : next(err);
    });
};

module.exports = {
  getAllTasks,
  createTask,
  deleteTask,
};
