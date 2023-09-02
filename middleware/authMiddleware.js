const jwt = require("jsonwebtoken");
const User = require("../models/userModel.js");

const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    // Jika token tidak ditemukan, abaikan middleware ini untuk rute yang memungkinkan akses tanpa otentikasi
    if (!token) {
      return next();
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findByPk(decoded.userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ error: "Invalid token" });
  }
};

const isAdmin = async (req, res, next) => {
  try {
    const { role } = req.user;

    if (role !== "admin") {
      return res.status(403).json({
        error: "Unauthorized: Hanya admin yang dapat mengakses halaman ini",
      });
    }
    next();
  } catch (error) {
    res.status(500).json({ error: "Failed to authorize" });
  }
};

const authMiddleware = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
};

module.exports = authMiddleware;
