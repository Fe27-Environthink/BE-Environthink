import express from "express";
import infografisController from "../controllers/infografisController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});
router.get("/infografis", infografisController.getInfografis);
router.get("/infografis/:id", infografisController.getInfografisById);
router.post(
  "/infografis",
  [authMiddleware.verifyToken, authMiddleware.isAdmin],
  infografisController.createInfografis
);
router.patch(
  "/infografis/:id",
  [authMiddleware.verifyToken, authMiddleware.isAdmin],
  infografisController.updateInfografis
);
router.delete(
  "/infografis/:id",
  [authMiddleware.verifyToken, authMiddleware.isAdmin],
  infografisController.deleteInfografis
);

export default router;
