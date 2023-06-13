import Donasi from "../models/donasiModel.js";
import User from "../models/userModel.js";

export const donasiController = {
  getDonasi: async (req, res) => {
    try {
      const response = await Donasi.findAll();
      res.json(response);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Failed to fetch donasi" });
    }
  },
  createDonasi: async (req, res) => {
    try {
      const { nama, nomor_hp, email, nomor_rekening, originalValue, user_id } =
        req.body;

      const formatedvalue = `Rp ${originalValue.toLocaleString()}`;

      const user = await User.findByPk(user_id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      const donasi = await Donasi.create({
        nama: nama,
        nomor_hp: nomor_hp,
        email: email,
        nomor_rekening: nomor_rekening,
        original_value: originalValue,
        formated_value: formatedvalue,
        user_id: user_id,
      });
      res.status(201).json({ message: "Donasi created successfully", donasi });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "Failed to create donasi" });
    }
  },

  getDonasiById: async (req, res) => {
    try {
      const response = await Donasi.findOne({
        where: {
          id: req.params.id,
        },
      });
      if (response) {
        res.json({ result: response });
      } else {
        res.status(404).json({ error: "Donasi not found" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Failed to fetch donasi" });
    }
  },
};

export default donasiController;
