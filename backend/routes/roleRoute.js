import express from "express";
import roleController from "../controllers/roleController.js";

const router = express.Router();

router.get("/role", roleController.getRole);
router.get("/role/:id", roleController.getRoleById);
router.post("/role", roleController.createRole);
router.patch("/role/:id", roleController.updateRole);
router.delete("/role/:id", roleController.deleteRole);

export default router;

