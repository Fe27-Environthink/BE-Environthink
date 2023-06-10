// routes/aksiRoutes.js
import express from "express";
import komentarController from "../controllers/komentarController.js"

const router = express.Router();

router.get("/komentar", komentarController.getKomentar);
router.get("/komentar/:id", komentarController.getKomentarById);
router.post("/komentar", komentarController.createKomentar);
router.patch("/komentar/:id", komentarController.updateKomentar);
router.delete("/komentar/:id", komentarController.deleteKomentar);

export default router;

