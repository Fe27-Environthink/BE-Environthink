// routes/aksiRoutes.js
import express from "express";
import komentarController from "../controllers/komentarController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/komentar", komentarController.getKomentar);
router.get("/komentar/:id", komentarController.getKomentarById);
router.post(
  "/komentar",
  [authMiddleware.verifyToken],
  komentarController.createKomentar
);
router.patch(
  "/komentar/:id",
  [authMiddleware.verifyToken],
  komentarController.updateKomentar
);
router.delete(
  "/komentar/:id",
  [authMiddleware.verifyToken],
  komentarController.deleteKomentar
);

export default router;
