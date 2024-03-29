const express = require("express");
const aksiController = require("../controllers/aksiController.js");
const authMiddleware = require("../middleware/authMiddleware.js");

const router = express.Router();

router.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});
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

module.exports = router;
