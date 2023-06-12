import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/userModel.js";

export const signup = async (req, res) => {
  try {
    const { username, email, password, telepon, kota, role } = req.body;

    const hashedPassword = await bcrypt.hash(password, 8);
    const userRole = role || "user";

    const user = await User.create({
      username: username,
      email: email,
      password: hashedPassword,
      telepon: telepon,
      kota: kota,
      role: userRole,
    });
    res.status(201).json({
      message: "User was registered successfully!",
      data: user,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to register" });
  }
};

export const signin = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        username: req.body.username,
      },
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compareSync(
      req.body.password,
      user.password
    );
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid password" });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: 86400, // 1 hari
    });

    res.status(200).json({
      message: "Success login!",
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      telepon: user.telepon,
      kota: user.kota,
      accessToken: token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to login" });
  }
};

export const adminBoard = async (req, res) => {
  try {
    const user = await User.findAll();

    res.status(200).json({
      message: "Admin Content",
      data: user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, email, role, telepon, kota } = req.body;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.username = username;
    user.email = email;
    user.role = role;
    user.telepon = telepon;
    user.kota = kota;
    await user.save();
    res.json({ message: "User updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    await user.destroy();
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    console.log(error);
    res.status(500).json({ message: err.message });
  }
};

const userController = {
  signup: signup,
  signin: signin,
  adminBoard: adminBoard,
  updateUser: updateUser,
  deleteUser: deleteUser,
};
export default userController;
