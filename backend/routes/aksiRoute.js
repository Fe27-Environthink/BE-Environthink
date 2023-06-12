// routes/aksiRoutes.js
import express from "express";
import aksiController from "../controllers/aksiController.js"

const router = express.Router();

router.get("/aksi", aksiController.getAksi);
router.get("/aksi/:id", aksiController.getIAksiById);
router.post("/aksi", aksiController.createAksi);
router.patch("/aksi/:id", aksiController.updateAksi);
router.delete("/aksi/:id", aksiController.deleteAksi);

export default router;

