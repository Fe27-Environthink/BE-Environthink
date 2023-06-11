import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import verifySignUp from "../middleware/verifySignUp.js";
import userController from "../controllers/userController.js";

const router = express.Router();

router.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

router.post("/user/signup", [verifySignUp], userController.signup);
router.post("/user/signin", userController.signin);
router.get(
  "/user",
  [authMiddleware.verifyToken, authMiddleware.isAdmin].userController.adminBoard
);
