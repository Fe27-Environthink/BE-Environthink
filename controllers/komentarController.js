import Komentar from "../models/komentarModel.js";
import User from "../models/userModel.js";
import artikel from "../models/artikelModel.js";

export const komentarController = {
  getKomentar: async (req, res) => {
    try {
      const response = await Komentar.findAll();
      res.json(response);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Failed to fetch Comment" });
    }
  },
  getKomentarById: async (req, res) => {
    try {
      const response = await Komentar.findOne({
        where: {
          id: req.params.id,
        },
      });
      if (response) {
        res.json({ result: response });
      } else {
        res.status(404).json({ message: "Comment not found" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Failed to fetch Comment" });
    }
  },
  createKomentar: async (req, res) => {
    const { name, email, komentar } = req.body;
    const article_id = req.params.id;

    const user_id = req.user.id;
    const user = await User.findByPk(user_id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.email !== email) {
      return res
        .status(400)
        .json({ message: "Comment data does not match the logged-in user" });
    }
    const artikels = await artikel.findByPk(article_id);
    if (!artikels) {
      return res.status(404).json({ message: "Artikel not found" });
    }
    try {
      const newKomentar = await Komentar.create({
        article_id,
        user_id,
        name,
        email,
        komentar,
      });
      res.status(201).json({
        success: true,
        message: "Successfully Created Comment",
        result: newKomentar,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  },
  updateKomentar: async (req, res) => {
    const { id } = req.params;
    const { name, email, komentar } = req.body;

    try {
      const comment = await Komentar.findByPk(id);
      if (!comment) {
        return res.status(404).json({ message: "Komentar not found" });
      }
      if (name) {
        comment.name = name;
      }
      if (email) {
        comment.email = email;
      }
      if (komentar) {
        comment.komentar = komentar;
      }
      await comment.save();
      res.json({ message: "Comment updated successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  },
  deleteKomentar: async (req, res) => {
    const { id } = req.params;
    try {
      const comment = await Komentar.findByPk(id);
      if (!comment) {
        return res.status(404).json({ message: "Comment not found" });
      }
      await comment.destroy();
      res.json({ message: "Comment deleted successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  },
};

export default komentarController;
