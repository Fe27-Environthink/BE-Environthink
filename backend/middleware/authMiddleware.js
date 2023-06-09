import jwt from "jsonwebtoken";
import config from "../config/auth.js";
import dbs from "../models/index.js";

const User = dbs.User;

export const verifyToken = (req, res, next) => {
  let token = req.header["x-access-token"];

  if (!token) {
    return res.status(403).json({ message: "No token provide!" });
  }
  jwt.verify(token, config.secret, (error, decoded) => {
    if (error) {
      return res.status(401).json({ message: "Unauthorized!" });
    }
    req.userId = decoded.id;
    next();
  });
};
export const isAdmin = (req, res, next) => {
  User.findByPk(req.userId).then((user) => {
    user.getRoles().then((role) => {
      for (let i = 0; i < role.length; i++) {
        if (role[i].name === "admin") {
          next();
          return;
        }
      }
      res.status(403).json({
        message: "Require Admin Role!",
      });
      return;
    });
  });
};

const authMiddleware = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
};

export default authMiddleware;
