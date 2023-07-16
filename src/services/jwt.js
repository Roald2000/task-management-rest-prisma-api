const createHttpError = require("http-errors");
const jwt = require("jsonwebtoken");

require("dotenv").config();

function jwtSignToken(payload) {
  try {
    return jwt.sign({ user: payload }, process.env.SECRET_KEY, {
      expiresIn: process.env.LIFE_SECRET,
    });
  } catch (error) {
    throw error;
  }
}

function jwtVerifyToken(token) {
  return new Promise((resolve, reject) => {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    let err;

    if (!decoded) {
      err = createHttpError.Unauthorized();
      reject(err);
    }

    if (decoded.exp < Date.now() / 1000) {
      err = createHttpError.Forbidden();
      reject(err);
    }

    resolve(decoded?.user);
  });
}

/**
 *@description Authentication Middleware
 */
async function authenticateUser(req, res, next) {
  try {
    const token = req.headers.authorization;

    if (!token) {
      throw createHttpError.Unauthorized();
    }

    const user = await jwtVerifyToken(token);

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = {
  jwtSignToken,
  jwtVerifyToken,
  authenticateUser,
};
