import path from "path";
import fs from "fs";
import Kontribusi from "../models/kontribusiModel.js";

export const kontribusiController = {
  getKontribusi: async (req, res) => {
    try {
      const response = await Kontribusi.findAll();
      res.json(response);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Failed to fetch Kontribusi" });
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
        res.status(404).json({ error: "Kontribusi not found" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Failed to fetch Kontribusi" });
    }
  },
  
  createKontribusi: async (req, res) => {
    if (req.files === null)
      return res.status(400).json({ message: "No file Uploaded" });
    const file = req.files.Image;
   const fileSize = file.data.length;
    console.log("ini file size", fileSize);
    const ext = path.extname(file.name);
    const fileName = file.md5 + ext;
    const url = `${req.protocol}://${req.get("host")}/kontribusi/${fileName}`;
    const allowedType = [".png", ".jpg", ".jpeg"];
    const aksi_id = req.body.aksi_id;
    const telepon = req.body.telepon;
    const email = req.body.email;
    const name = req.body.name;


    if (!allowedType.includes(ext.toLowerCase()))
      return res.status(422).json({ message: "Invalid Images Type" });
    if (fileSize > 5000000)
      return res.status(422).json({ message: "Image size larger than 5 MB" });

      file.mv(`./public/kontribusi/${fileName}`, async (error) => {
      if (error) {

        return res.status(500).json({ message: error.message });
      }
      try {
        const newKontribusi = await Kontribusi.create({
            aksi_id: aksi_id,
            email: email,
            name: name,
            image: fileName,
            url: url,
            telepon: telepon,
        });
        res.status(201).json({
          success: true,
          message: "Successfully Created Kontribusi",
          result: newKontribusi,
        });
      } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: `ini error` });
      }
    });
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
        {  aksi_id: aksi_id,
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