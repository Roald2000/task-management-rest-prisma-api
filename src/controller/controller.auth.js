const createHttpError = require("http-errors");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");
const { jwtSignToken } = require("../services/jwt");

module.exports = class AuthController {
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      let user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        throw createHttpError.NotFound("User not registered");
      }

      const checkPassword = bcrypt.compareSync(password, user.password);

      if (!checkPassword) {
        throw createHttpError.Unauthorized("Invalid Email/Password");
      }

      delete user.password;

      res.status(201).json({
        token: jwtSignToken(user),
      });
    } catch (error) {
      next(error);
    }
  }

  static async logout(req, res, next) {
    try {
      const token = req.headers.authorization;

      

    } catch (error) {
      next(error);
    }
  }

  static async register(req, res, next) {
    try {
      const { email, password } = req.body;

      let user = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (user) {
        throw createHttpError.Conflict("Username taken");
      }

      const hash_password = bcrypt.hashSync(password, 8);

      const createUser = await prisma.user.create({
        data: { email: email, password: hash_password },
      });

      res.status(201).json({
        data: "User Created",
        status: 201,
      });
    } catch (error) {
      next(error);
    }
  }

  static async all(req, res, next) {
    try {
      let users = await prisma.user.findMany({
        include: { user_information: true, task: true },
      });

      users.forEach((content) => {
        delete content.password;
      });

      res.status(200).json({
        data: users,
        status: 200,
        auth: { ...req.user },
      });
    } catch (error) {
      next(error);
    }
  }
};
