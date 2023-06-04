import Infografis from "../models/infografisModel.js";
import path from "path";

export const infografisController = {
  getInfografis: async (req, res) => {
    try {
      const response = await Infografis.findAll();
      res.json(response);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Failed to fetch infografis" });
    }
  },
  getInfografisById: async (req, res) => {
    const { id } = req.params;

    try {
      const response = await infografis.findByPk(id);
      if (response) {
        res.json({ result: response });
      } else {
        res.status(404).json({ error: "Infografis not found" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Failed to fetch infografis" });
    }
  },
  createInfografis: async (req, res) => {
    if (req.files === null)
      return res.status(400).json({ message: "No file Uploaded" });
    const name = req.body.title;
    const file = req.files.file;
    const fileSize = file.data.lenght;
    const ext = path.extname(file.name);
    const fileName = file.md5 + ext;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    const allowedType = [".png", ".jpg", ".jpeg"];

    if (!allowedType.includes(ext.toLowerCase()))
      return res.status(422).json({ message: "Invalid Images Type" });
    if (fileSize > 5000000)
      return res.status(422).json({ message: "Images must less than 5 MB" });

    file.mv(`./images/${filename}`, async (error) => {
      if (error) return res.status(500).json({ message: error.message });
      try {
        await Infografis.create({ judul: name, gambar: fileName, url: url });
        res.status(201).json({ message: "Success Created Infografis" });
      } catch (error) {
        console.log(error.message);
      }
    });
  },
  updateInfografis: (req, res) => {},
  deleteInfografis: (req, res) => {},
};

export default infografisController;
