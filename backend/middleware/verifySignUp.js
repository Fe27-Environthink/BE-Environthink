import dbs from "../models/index.js";
import User from "../models/userModel.js";

export const checkDuplicateUsernameOrEmail = async (req, res, next) => {
  // USERNAME
  try {
    const userByUsername = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (userByUsername) {
      res.status(400).json({ message: "Username is already in use!" });
      return;
    }
    // EMAIL
    const userByEmail = await User.findOne({
      where: {
        username: req.body.email,
      },
    });

    if (userByEmail) {
      res.status(400).json({ message: "Email is already in use!" });
      return;
    }

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const checkRolesExisted = async (req, res, next) => {
  if (req.body.role) {
    try {
      const { ROLES } = dbs;
      for (let i = 0; i < req.body.role.length; i++) {
        const role = req.body.role[i];

        if (!ROLES.includes(role)) {
          res.status(400).json({
            message: "Role does not exist = " + role,
          });
          return;
        }
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
      return;
    }
  }
  next();
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
  checkRolesExisted: checkRolesExisted,
};

export default verifySignUp;
