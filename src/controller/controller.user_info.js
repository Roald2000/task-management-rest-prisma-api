const createHttpError = require("http-errors");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = class UserInformation {
  static async createUserInfo(req, res, next) {
    try {
      const user_id = req.user.id;

      let result = await prisma.userInformation.create({
        data: { user_id: user_id, ...req.body },
      });

      result &&
        res.status(201).json({
          data: result,
          message: "User Information Created",
          status: 201,
        });
    } catch (error) {
      next(error);
    }
  }

  static async getUserInfo(req, res, next) {
    try {
      const { id } = req.user;

      let result = await prisma.user.findUnique({
        where: { id: id },
        include: {
          user_information: true,
        },
      });

      delete result.password;

      res.status(200).json({
        data: result,
        message: "User Information Load Success!",
        status: 200,
      });
    } catch (error) {
      next(error);
    }
  }
};
