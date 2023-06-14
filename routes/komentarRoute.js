// routes/komentarRoutes.js
import express from "express";
import komentarController from "../controllers/komentarController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/komentar", komentarController.getKomentar);
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
