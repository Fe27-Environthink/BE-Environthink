import express from "express";
import donasiController from "../controllers/donasiController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// router.get("/donasi", donasiController.get);
router.get("/donasi", donasiController.getDonasi);
router.get("/donasi/:id", donasiController.getDonasiById);
router.post(
  "/donasi",
  [authMiddleware.verifyToken],
  donasiController.createDonasi
);
router.patch(
  "/donasi/:id",
  [authMiddleware.verifyToken, authMiddleware.isAdmin],
  donasiController.createDonasi
);
router.delete(
  "/donasi/:id",
  [authMiddleware.verifyToken, authMiddleware.isAdmin],
  donasiController.createDonasi
);

export default router;
