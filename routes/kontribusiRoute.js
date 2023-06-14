// routes/kontribusiRoutes.js
import express from "express";
import kontribusiController from "../controllers/kontribusiController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/kontribusi", kontribusiController.getKontribusi);
router.get("/kontribusi/:id", kontribusiController.getKontribusiById);
router.post(
  "/kontribusi",
  [authMiddleware.verifyToken],
  kontribusiController.createKontribusi
);

export default router;
