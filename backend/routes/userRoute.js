import express from "express";
import userController from "../controllers/userController.js";

const router = express.Router();

router.get("/user", userController.getUser);
router.get("/user/:id", userController.login);
router.post("/user", userController.register);
router.patch("/user/:id", userController.updateUser);
router.delete("/user/:id", userController.deleteUser);

export default router;
