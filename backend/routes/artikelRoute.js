import express from "express";
import artikelsController from "../controllers/artikelController.js";

const router = express.Router();

router.get("/artikel", artikelsController.getArtikels);
router.get("/artikel/:id", artikelsController.getArtikelsById);
router.post("/artikel", artikelsController.createArtikels);
router.patch("/artikel/:id", artikelsController.updateArtikels);
router.delete("/artikel/:id", artikelsController.deleteArtikels);

export default router;
