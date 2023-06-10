// import path from "path";
// import fs from "fs";
// import Komentar from "../models/komentarModel.js";

// export const komentarController = {
//   getKomentar: async (req, res) => {
//     try {
//       const response = await Komentar.findAll();
//       res.json(response);
//     } catch (error) {
//       console.log(error);
//       res.status(500).json({ error: "Failed to fetch Komnetar" });
//     }
//   },
//   getKomentarById: async (req, res) => {
//     try {
//       const response = await Komentar.findOne({
//         where: {
//           id: req.params.id,
//         },
//       });
//       if (response) {
//         res.json({ result: response });
//       } else {
//         res.status(404).json({ error: "Komentar not found" });
//       }
//     } catch (error) {
//       console.log(error);
//       res.status(500).json({ error: "Failed to fetch Komentar" });
//     }
//   },
//   createKomentar: async (req, res) => {
//     const komentar_id  = req.body.komentar_id;
//     const article_id  = req.body.article_id;
//     const user_id  = req.body.user_id;
//     const name  = req.body.name;
//     const  email = req.body.email;
//     const  komentar  = req.body.komentar;
    
//     try {
//       const newKomentar = await Komentar.create({ 
//         komentar_id: komentar_id,
//         article_id: article_id, 
//         user_id: user_id,
//         name: name, 
//         email: email, 
//         komentar: komentar, 
//       });
//       res.json(newKomentar);
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   },
//   updateKomentar: async (req, res) => {
//     const  komentar_id  = req.body.komentar_id;
//     const  article_id  = req.body.article_id;
//     const  user_id  = req.body.user_id;
//     const  name  = req.body.name;
//     const  email  = req.body.email;
//     const  komentar  = req.body.komentar;
//     try {
//       await Komentar.update({ 
//           komentar_id: komentar_id,
//           article_id: article_id, 
//           user_id: user_id,
//           name: name, 
//           email: email, 
//           komentar: komentar,       }, 
        
//         { 
//           where: { 
//             id: req.params.id,
//            },
//            }
//       );
//       res.json({ message: 'Komentar updated successfully' });
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   },
//   deleteKomentar: async (req, res) => {
//     const { id } = req.params;
//     try {
//       await Komentar.destroy({ where: { id: id } });
//       res.json({ message: 'Komentar deleted successfully' });
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   },
// };

// export default komentarController;

import path from "path";
import fs from "fs";
import Komentar from "../models/komentarModel.js";

export const KomentarController = {
  getKomentar: async (req, res) => {
    try {
      const response = await Komentar.findAll();
      res.json(response);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Failed to fetch Komentar" });
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
        res.status(404).json({ error: "Komentar not found" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Failed to fetch Komentar" });
    }
  },
  createKomentar: async (req, res) => {
    const komentar_id = req.body.komentar_id;
    const article_id = req.body.article_id;
    const user_id = req.body.user_id;
    const name = req.body.name;
    const email = req.body.email;
    const komentar = req.body.komentar;
    
    

    try {
      const newKomentar = await Komentar.create({ komentar_id, article_id, user_id, name, email, komentar });
      res.json(newKomentar);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  updateKomentar: async (req, res) => {
    const komentar_id = req.body.komentar_id;
    const article_id = req.body.article_id;
    const user_id = req.body.user_id;
    const name = req.body.name;
    const email = req.body.email;
    const komentar = req.body.komentar;
    


    try {
      await Komentar.update({ komentar_id, article_id, user_id, name, email, komentar }, { where: { komentar_id } });
      res.json({ message: 'Komentar updated successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  deleteKomentar: async (req, res) => {
    const { id } = req.params;
    try {
      await Komentar.destroy({ where: { komentar_id: id } });
      res.json({ message: 'Komentar deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

export default KomentarController;