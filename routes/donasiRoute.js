import express from "express";
import donasiController from "../controllers/donasiController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// router.get("/donasi", donasiController.get);
router.post(
  "/donasi",
  [authMiddleware.verifyToken],
  donasiController.createDonasi
);
router.get("/donasi", donasiController.getDonasi);
router.get("/donasi/:id", donasiController.getDonasiById);

export default router;
