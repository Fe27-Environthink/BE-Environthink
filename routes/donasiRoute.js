import express from "express";
import donasiController from "../controllers/donasiController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// router.get("/donasi", donasiController.get);
router.get(
  "/donasi",
  [authMiddleware.verifyToken, authMiddleware.isAdmin],
  donasiController.getDonasi
);
router.get(
  "/donasi/:id",
  [authMiddleware.verifyToken, authMiddleware.isAdmin],
  donasiController.getDonasiById
);
router.post(
  "/donasi",
  [authMiddleware.verifyToken],
  donasiController.createDonasi
);
router.patch(
  "/donasi/:id",
  [authMiddleware.verifyToken, authMiddleware.isAdmin],
  donasiController.updateDonasi
);
router.delete(
  "/donasi/:id",
  [authMiddleware.verifyToken, authMiddleware.isAdmin],
  donasiController.deleteDonasi
);

export default router;
