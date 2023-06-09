import dbs from "../models/index.js";
import config from "../config/auth.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const User = dbs.user;
const Role = dbs.role;

const Op = dbs.Sequelize.Op;

export const authController = {
  signup: (req, res) => {
    // Save user to database
    User.create({
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
    })
      .then((user) => {
        if (req.body.role) {
          Role.findAll({
            where: {
              name: {
                [Op.or]: req.body.role,
              },
            },
          }).then((role) => {
            user.setRoles(role).then(() => {
              res.json({ message: "User was registered successfully!" });
            });
          });
        } else {
          // user role = 1
          user.setRoles([1]).then(() => {
            res.json({ message: "User was registered successfully!" });
          });
        }
      })
      .catch(error);
    console.log(error.message);
    res.status(500).json({ message: error.message });
  },

  signin: (req, res) => {
    User.findOne({
      where: {
        username: req.body.username,
      },
    })
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: "User Not found." });
        }

        var passwordIsValid = bcrypt.compareSync(
          req.body.password,
          user.password
        );

        if (!passwordIsValid) {
          return res.status(401).json({
            accessToken: null,
            message: "Invalid Password!",
          });
        }

        var token = jwt.sign({ id: user.id }, config.secret, {
          expiresIn: 86400, // 1 day
        });

        var authorities = [];
        user.getRoles().then((role) => {
          for (let i = 0; i < roles.length; i++) {
            authorities.push("ROLE_" + role[i].name.toUpperCase());
          }
          res.status(200).json({
            id: user.id,
            username: user.username,
            email: user.email,
            role: authorities,
            accessToken: token,
          });
        });
      })
      .catch((err) => {
        res.status(500).json({ message: err.message });
      });
  },
};

export default authController;
