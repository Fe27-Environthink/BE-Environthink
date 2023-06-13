import path from "path";
import fs from "fs";
import Kontribusi from "../models/kontribusiModel.js";
import Aksi from "../models/aksiModel.js";

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
    const aksi_id = req.params.id;

    const aksi = await Aksi.findByPk(aksi_id);
    if (!aksi) {
      return res.status(404).json({ message: "Aksi not found" });
    }
    try {
      const petisi = await Aksi.create({
        aksi_id,
        telepon,
        name,
        email,
        kota,
      });
      res.status(201).json({
        success: true,
        message: "Successfully Created Petisi",
        result: petisi,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  },
  updateKontribusi: async (req, res) => {
    const Kontribusi = await Kontribusi.findOne({
      where: {
        id: req.params.id,
      },
    });
    console.log(Kontribusi);

    if (!Kontribusi) return res.status(404).json({ message: "Data Not Found" });
    let fileName = "";
    if (req.file === null) {
      fileName = Kontribusi.Image;
    } else {
      const file = req.files.file;
      const fileSize = req.files.image.size;
      const ext = path.extname(req.files.image.name);
      fileName = req.files.image.md5 + ext;
      const allowedType = [".png", ".jpg", ".jpeg"];

      if (!allowedType.includes(ext.toLowerCase()))
        return res.status(422).json({ message: "Invalid Images Type" });
      if (fileSize > 5000000)
        return res.status(422).json({ message: "Image size larger than 5 MB" });

      const filepath = `./public/kontribusi/${fileName}`;
      fs.unlinkSync(filepath);

      file.mv(`./public/kontribusi/${fileName}`, (error) => {
        if (error) {
          console.log(`ini error`);
          return res.status(500).json({ message: error.message });
        }
      });
    }
    const aksi_id = req.body.aksi_id;
    const telepon = req.body.telepon;
    const email = req.body.email;
    const name = req.body.name;
    const url = `${req.protocol}://${req.get("host")}/kontribusi/${fileName}`;
    try {
      await Kontribusi.update(
        {
          aksi_id: aksi_id,
          email: email,
          name: name,
          image: fileName,
          url: url,
          telepon: telepon,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );
      res.status(200).json({
        message: "Successfully Updated kontribusi",
      });
    } catch (error) {
      console.log(error.message);
    }
  },
  deleteKontribusi: async (req, res) => {
    const Kontribusi = await Kontribusi.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!Kontribusi) return res.status(404).json({ message: "Data Not Found" });
    try {
      const filepath = `./public/kontribusi/${fileName}`;
      fs.unlinkSync(filepath);
      await Kontribusi.destroy({
        where: {
          id: req.params.id,
        },
      });
      res.status(200).json({ message: " Successfully Deleted kontribusi" });
    } catch (error) {
      console.log(error.message);
    }
  },
};

export default kontribusiController;
