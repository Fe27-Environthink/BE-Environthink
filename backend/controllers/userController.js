import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const userController = {
  register: async (req, res) => {
    try {
      const { name, email, password, role } = req.body;
      const user = await User.create({
        name: name,
        email: email,
        password: password,
        role: role || "user",
      });
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
      res.status(201).json({ user, token });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Failed to register" });
    }
  },
  getUser: async (req, res) => {
    // try {
    //   const response = await Infografis.findAll();
    //   res.json(response);
    // } catch (error) {
    //   console.log(error);
    //   res.status(500).json({ error: "Failed to fetch infografis" });
    // }
  },
  login: async (req, res) => {
    // try {
    //   const response = await Infografis.findOne({
    //     where: {
    //       id: req.params.id,
    //     },
    //   });
    //   if (response) {
    //     res.json({ result: response });
    //   } else {
    //     res.status(404).json({ error: "Infografis not found" });
    //   }
    // } catch (error) {
    //   console.log(error);
    //   res.status(500).json({ error: "Failed to fetch infografis" });
    // }
  },
  updateUser: async (req, res) => {
    // const infografis = await Infografis.findOne({
    //   where: {
    //     id: req.params.id,
    //   },
    // });
    // if (!infografis) return res.status(404).json({ message: "Data Not Found" });
    // let fileName = "";
    // if (req.file === null) {
    //   fileName = Infografis.gambar;
    // } else {
    //   const file = req.files.file;
    //   const fileSize = file.data.lenght;
    //   const ext = path.extname(file.name);
    //   fileName = file.md5 + ext;
    //   const allowedType = [".png", ".jpg", ".jpeg"];
    //   if (!allowedType.includes(ext.toLowerCase()))
    //     return res.status(422).json({ message: "Invalid Images Type" });
    //   if (fileSize > 5000000)
    //     return res.status(422).json({ message: "Image size larger than 5 MB" });
    //   const filepath = `./assets/images/${infografis.gambar}`;
    //   fs.unlinkSync(filepath);
    //   file.mv(`./assets/images/${fileName}`, (error) => {
    //     if (error) {
    //       return res.status(500).json({ message: error.message });
    //     }
    //   });
    // }
    // const name = req.body.title;
    // const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    // try {
    //   await Infografis.update(
    //     { judul: name, gambar: fileName, url: url },
    //     {
    //       where: {
    //         id: req.params.id,
    //       },
    //     }
    //   );
    //   res.status(200).json({
    //     message: "Successfully Updated Product",
    //   });
    // } catch (error) {
    //   console.log(error.message);
    // }
  },
  deleteUser: async (req, res) => {
    // const infografis = await Infografis.findOne({
    //   where: {
    //     id: req.params.id,
    //   },
    // });
    // if (!infografis) return res.status(404).json({ message: "Data Not Found" });
    // try {
    //   const filepath = `./assets/images/${infografis.gambar}`;
    //   fs.unlinkSync(filepath);
    //   await Infografis.destroy({
    //     where: {
    //       id: req.params.id,
    //     },
    //   });
    //   res.status(200).json({ message: " Successfully Deleted Infografis" });
    // } catch (error) {
    //   console.log(error.message);
    // }
  },
};

export default userController;
