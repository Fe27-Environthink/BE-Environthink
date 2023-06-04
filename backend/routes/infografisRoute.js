import express from "express";
import infografisController from "../controllers/infografisController.js";

const router = express.Router();

router.get("/infografis", infografisController.getInfografis);
router.get("/infografis/:id", infografisController.getInfografisById);
router.post("/infografis", infografisController.createInfografis);
router.patch("/infografis/:id", infografisController.updateInfografis);
router.delete("/infografis/:id", infografisController.deleteInfografis);

export default router;
