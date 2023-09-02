const express = require("express");
const authMiddleware = require("../middleware/authMiddleware.js");
const verifySignUp = require("../middleware/verifySignUp.js");
const userController = require("../controllers/userController.js");

const router = express.Router();

router.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

router.post("/user/signup", verifySignUp, userController.signup);
router.post("/user/signin", userController.signin);
// router.get(
//   "/user",
//   [authMiddleware.verifyToken, authMiddleware.isAdmin],
//   userController.adminBoard
// );
router.patch(
  "/user/:id",
  [authMiddleware.verifyToken, authMiddleware.isAdmin],
  userController.updateUser
);
router.delete(
  "/user/:id",
  [authMiddleware.verifyToken, authMiddleware.isAdmin],
  userController.deleteUser
);
router.get("/user", userController.getUser);

module.exports = router;
