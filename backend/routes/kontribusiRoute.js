// routes/kontribusiRoutes.js
import express from "express";
import kontribusiController from "../controllers/kontribusiController.js"

const router = express.Router();

router.get("/kontribusi", kontribusiController.getKontribusi);
router.get("/kontribusi/:id", kontribusiController.getKontribusiById);
router.post("/kontribusi", kontribusiController.createKontribusi);
router.patch("/kontribusi/:id", kontribusiController.updateKontribusi);
router.delete("/kontribusi/:id", kontribusiController.deleteKontribusi);

export default router;

