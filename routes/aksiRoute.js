// routes/aksiRoutes.js
import express from "express";
import aksiController from "../controllers/aksiController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/aksi", aksiController.getAksi);
router.get("/aksi/:id", aksiController.getIAksiById);
router.post(
  "/aksi",
  [authMiddleware.verifyToken, authMiddleware.isAdmin],
  aksiController.createAksi
);
router.patch(
  "/aksi/:id",
  [authMiddleware.verifyToken, authMiddleware.isAdmin],
  aksiController.updateAksi
);
router.delete(
  "/aksi/:id",
  [authMiddleware.verifyToken, authMiddleware.isAdmin],
  aksiController.deleteAksi
);

export default router;
