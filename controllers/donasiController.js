import { or } from "sequelize";
import Donasi from "../models/donasiModel.js";
import User from "../models/userModel.js";

export const donasiController = {
  getDonasi: async (req, res) => {
    try {
      const response = await Donasi.findAll();
      res.json(response);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Failed to fetch donasi" });
    }
  },
  createDonasi: async (req, res) => {
    try {
      const { nama, nomor_hp, email, nomor_rekening, original_value } =
        req.body;

      const formatter = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      });
      const formated_value = formatter.format(original_value);
      const user_id = req.user.id;

      const user = await User.findByPk(user_id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      if (user.email !== email) {
        return res
          .status(400)
          .json({ message: "Donation data does not match the logged-in user" });
      }
      const donasi = await Donasi.create({
        nama,
        nomor_hp,
        email,
        nomor_rekening,
        original_value,
        formated_value,
        user_id,
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
        res.status(404).json({ message: "Donasi not found" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Failed to fetch donasi" });
    }
  },
  updateDonasi: async (req, res) => {
    const { id } = req.params;
    const { nama, nomor_hp, email, nomor_rekening, original_value } = req.body;
    try {
      const donasi = await Donasi.findByPk(id);
      if (!donasi) {
        return res.status(404).json({ message: "Donasi not found" });
      }
      if (nama) {
        donasi.nama = nama;
      }
      if (email) {
        donasi.email = donasi;
      }
      if (nomor_hp) {
        donasi.nomor_hp = nomor_hp;
      }
      if (nomor_rekening) {
        donasi.nomor_rekening = nomor_rekening;
      }
      if (original_value) {
        donasi.original_value = original_value;
      }
      const formatter = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      });
      const formated_value = formatter.format(original_value);

      donasi.formated_value = formated_value;
      await donasi.save();
      res.json({ message: "Donasi updated successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  },

  deleteDonasi: async (req, res) => {
    const { id } = req.params;
    try {
      const donasi = await Donasi.findByPk(id);
      if (!donasi) {
        return res.status(404).json({ message: "Donasi not found" });
      }
      await donasi.destroy();
      res.json({ message: "Donasi deleted successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  },
};

export default donasiController;
