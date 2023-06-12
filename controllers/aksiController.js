import Aksi from "../models/aksiModel.js";
import path from "path";
import fs from "fs";

export const aksiController = {
  getAksi: async (req, res) => {
    try {
      const response = await Aksi.findAll();
      res.json(response);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Failed to fetch Aksi" });
    }
  },
  getIAksiById: async (req, res) => {
    try {
      const response = await Aksi.findOne({
        where: {
          id: req.params.id,
        },
      });
      if (response) {
        res.json({ result: response });
      } else {
        res.status(404).json({ error: "Aksi not found" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Failed to fetch Aksi" });
    }
  },
  
  createAksi: async (req, res) => {
    if (req.files === null)
      return res.status(400).json({ message: "No file Uploaded" });
    const aksi_id = req.body.aksi_id;
    const file = req.files.image;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const fileName = file.md5 + ext;
    const url = `${req.protocol}://${req.get("host")}/aksi/${fileName}`;
    const allowedType = [".png", ".jpg", ".jpeg"];
    const title = req.body.title;
    const desc = req.body.desc;
    const desc1 = req.body.desc1;
    const desc2 = req.body.desc2;
    const teks = req.body.teks;
    const hashtag = req.body.hashtag;


    if (!allowedType.includes(ext.toLowerCase()))
      return res.status(422).json({ message: "Invalid Images Type" });
    if (fileSize > 5000000)
      return res.status(422).json({ message: "Image size larger than 5 MB" });

    file.mv(`./public/aksi/${fileName}`, async (error) => {
      if (error) {
        return res.status(500).json({ message: error.message });
      }
      try {
        const newAksi = await Aksi.create({

          aksi_id: aksi_id,
          image: fileName,
          url: url,
          title: title,
          hashtag: hashtag,
          desc: desc,
          desc1: desc1,
          desc2: desc2,
          teks: teks,
        });
        res.status(201).json({
          success: true,
          message: "Successfully Created Aksi",
          result: newAksi,
        });
      } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
      }
    });
  },
  updateAksi: async (req, res) => {
    const Aksi = await Aksi.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!Aksi) return res.status(404).json({ message: "Data Not Found" });

    let fileName = "";
    if (req.file === null) {
      fileName = Aksi.gambar;
    } else {
      const file = req.files.file;
      const fileSize = file.data.length;
      const ext = path.extname(file.name);
      fileName = file.md5 + ext;
      const allowedType = [".png", ".jpg", ".jpeg"];

      if (!allowedType.includes(ext.toLowerCase()))
        return res.status(422).json({ message: "Invalid Images Type" });
      if (fileSize > 5000000)
        return res.status(422).json({ message: "Image size larger than 5 MB" });

      const filepath = `./public/aksi/${fileName}`;
      fs.unlinkSync(filepath);

      file.mv(`./public/aksi/${fileName}`, (error) => {
        if (error) {
          return res.status(500).json({ message: error.message });
        }
      });
    }
    const aksi_id = req.body.aksi_id;
    const title = req.body.title;
    const hashtag = req.body.hashtag;
    const desc = req.body.desc;
    const desc1 = req.body.desc1;
    const desc2 = req.body.desc2;
    const teks = req.body.teks;
    const url = `${req.protocol}://${req.get("host")}/aksi/${fileName}`;
    try {
      await Aksi.update(
        {  aksi_id: aksi_id,
          image: fileName,
          url: url,
          title: title,
          hashtag: hashtag,
          desc: desc,
          desc1: desc1,
          desc2: desc2,
          teks: teks,
          },
        {
          where: {
            id: req.params.id,
          },
        }
      );
      res.status(200).json({
        message: "Successfully Updated Product",
      });
    } catch (error) {
      console.log(error.message);
    }
  },
  deleteAksi: async (req, res) => {
    const Aksi = await aksi.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!Aksi) return res.status(404).json({ message: "Data Not Found" });
    try {
      const filepath = `./public/aksi/${fileName}`;
      fs.unlinkSync(filepath);
      await Aksi.destroy({
        where: {
          id: req.params.id,
        },
      });
      res.status(200).json({ message: " Successfully Deleted aksi" });
    } catch (error) {
      console.log(error.message);
    }
  },
};

export default aksiController;