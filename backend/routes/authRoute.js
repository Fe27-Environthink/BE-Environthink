import express from "express";
import verifySignUp from "../middleware/verifySignUp.js";
import authController from "../controllers/authController.js";

const router = express.Router();
router.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

router.post(
  "/auth/signup",
  [verifySignUp.checkDuplicateUsernameOrEmail, verifySignUp.checkRolesExisted],
  authController.signup
);

router.post("/auth/signin", authController.signin);

export default router;
