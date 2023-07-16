const createHttpError = require("http-errors");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = class TaskController {
  static async searchTask(req, res, next) {
    try {
      const user_id = req.user.id;

      const search = req.params.search;

      let result = await prisma.task.findMany({
        where: {
          user_id: user_id,
          OR: [
            { task_description: search },
            { task_title: search },
            { t_id: search },
          ],
        },
      });

      res.status(200).json({
        data: result,
        message: "Task Loaded Succesfully!",
        status: 200,
      });
    } catch (error) {
      next(error);
    }
  }

  static async all(req, res, next) {
    try {
      const user_id = req.user.id;

      let result = await prisma.task.findMany({
        where: { user_id: user_id },
      });

      if (!result) {
        throw createHttpError.NotFound("You have no tasks");
      }

      res.status(200).json({
        data: result,
        message: "Task Loaded Succesfully!",
        status: 200,
      });
    } catch (error) {
      next(error);
    }
  }

  static async create(req, res, next) {
    try {
      const { task_title, task_description } = req.body;

      let prismaTask = await prisma.task.create({
        data: {
          user_id: req.user.id,
          task_title: task_title,
          task_description: task_description,
        },
      });

      res.status(201).json({
        data: prismaTask,
        status: 201,
        message: "Task Created",
      });
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const { task_title, task_description, task_status } = req.body;

      const isValid = await prisma.task.findUnique({
        where: { t_id: req.params.t_id, user_id: req.user.id },
      });

      if (!isValid) {
        throw createHttpError.NotFound("Task Does not exist");
      }

      let update = await prisma.task.update({
        where: { t_id: req.params.t_id, user_id: req.user.id },
        data: {
          task_title: task_title,
          task_description: task_description,
          task_status: task_status,
        },
      });

      update &&
        res.status(201).json({
          message: "Task Updated",
          status: 201,
        });
    } catch (error) {
      next(error);
    }
  }

  static async deleteTask(req, res, next) {
    try {
      await prisma.task.delete({ where: { t_id: req.params.t_id } });
      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  }
};
