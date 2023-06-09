import dbs from "../models/index.js";

const ROLES = dbs.ROLES;
const User = dbs.user;

export const checkDuplicateUsernameOrEmail = (req, res, next) => {
  // USERNAME
  User.findOne({
    where: {
      username: req.body.username,
    },
  }).then((user) => {
    if (user) {
      res.status(400).json({ message: "Username is already use!" });
      return;
    }
    // EMAIL
    User.findOne({
      where: {
        email: req.body.email,
      },
    }).then((user) => {
      if (user) {
        res.status(400).json({
          message: "Email is already in use!",
        });
        return;
      }
      next();
    });
  });
};

export const checkRolesExisted = (req, res, next) => {
  if (req.body.role) {
    for (let i = 0; i < req.body.role.length; i++) {
      if (!ROLES.includes(req.body.role[i])) {
        res.status(400).json({
          message: "Role does not exist = " + req.body.role[i],
        });
        return;
      }
    }
  }
  next();
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
  checkRolesExisted: checkRolesExisted,
};

export default verifySignUp;
