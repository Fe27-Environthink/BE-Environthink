import authMiddleware from "../middleware/authMiddleware.js";
import userController from "../controllers/userController.js";
import express from "express";

const router = express.Router();

router.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

router.get("/test/all", userController.allAccess);

router.get(
  "/test/user",
  [authMiddleware.verifyToken],
  userController.userBoard
);

router.get(
  "/test/admin",
  [authMiddleware.verifyToken, authMiddleware.isAdmin],
  userController.adminBoard
);
export default router;
