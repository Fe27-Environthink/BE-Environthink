import Kontribusi from "../models/kontribusiModel.js";
import Aksi from "../models/aksiModel.js";
import User from "../models/userModel.js";

export const kontribusiController = {
  getKontribusi: async (req, res) => {
    try {
      const response = await Kontribusi.findAll();
      res.json(response);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Failed to fetch Kontribusi" });
    }
  },
  getKontribusiById: async (req, res) => {
    try {
      const response = await Kontribusi.findOne({
        where: {
          id: req.params.id,
        },
      });
      if (response) {
        res.json({ result: response });
      } else {
        res.status(404).json({ message: "Kontribusi not found" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Failed to fetch Kontribusi" });
    }
  },

  createKontribusi: async (req, res) => {
    const { name, email, telepon, kota } = req.body;
    const aksi_id = req.query.aksiId;

    const user_id = req.user.id;
    const user = await User.findByPk(user_id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.email !== email) {
      return res
        .status(400)
        .json({ message: "Email does not match the logged-in user" });
    }
    if (user.telepon !== telepon) {
      return res
        .status(400)
        .json({ message: "Telepon does not match the logged-in user" });
    }
    if (user.kota !== kota) {
      return res
        .status(400)
        .json({ message: "Kota does not match the logged-in user" });
    }
    const aksi = await Aksi.findByPk(aksi_id);
    if (!aksi) {
      return res.status(404).json({ message: "Aksi not found" });
    }

    const existingKontribusi = await Kontribusi.findOne({
      where: {
        user_id: user_id,
        aksi_id: aksi_id,
      },
    });
    if (existingKontribusi) {
      return res
        .status(400)
        .json({ message: "You have already made a kontribusi" });
    }

    try {
      const petisi = await Kontribusi.create({
        user_id,
        aksi_id,
        telepon,
        name,
        email,
        kota,
      });

      aksi.numberofsupport += 1;
      await aksi.save();

      res.status(201).json({
        success: true,
        message: "Successfully Created Kontribusi",
        result: petisi,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  },
};

export default kontribusiController;
