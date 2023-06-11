import jwt from "jsonwebtoken";
import User from "../models";

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.header["x-access-token"];

    if (!token) {
      return res.status(401).json({ error: "Authorization token not found" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findByPk(decoded.userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    const { role } = req.user;

    if (role !== "admin") {
      return res.status(403).json({ error: "Access denied" });
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

export default authMiddleware;
