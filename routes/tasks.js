const taskRouter = require("express").Router();
const { celebrate, Joi } = require("celebrate");

const { getAllTasks, createTask, deleteTask } = require("../controllers/tasks");

taskRouter.get("/", (req, res, next) => {
  getAllTasks(req, res, next);
});

taskRouter.post(
  "/",
  celebrate({
    body: Joi.object().keys({
      title: Joi.string().required(),
      description: Joi.string().required(),
      details: Joi.string().required(),
    }),
  }),
  (req, res, next) => {
    createTask(req, res, next);
  }
);

taskRouter.delete(
  "/:taskId",
  celebrate({
    params: Joi.object().keys({
      taskId: Joi.string().alphanum().length(24).hex(),
    }),
  }),
  (req, res, next) => {
    deleteTask(req, res, next);
  }
);

module.exports = taskRouter;
