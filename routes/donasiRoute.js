const express = require("express");
const donasiController = require("../controllers/donasiController.js");
const authMiddleware = require("../middleware/authMiddleware.js");

const router = express.Router();

// router.get("/donasi", donasiController.get);
router.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});
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
router.delete(
  "/donasi/:id",
  [authMiddleware.verifyToken, authMiddleware.isAdmin],
  donasiController.deleteDonasi
);

module.exports = router;
