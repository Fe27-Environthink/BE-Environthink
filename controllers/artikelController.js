import Artikels from "../models/artikelModel.js";
import path from "path";
import fs from "fs";

export const ArtikelsController = {
  getArtikels: async (req, res) => {
    try {
      const response = await Artikels.findAll();
      res.json(response);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Failed to fetch Artikels" });
    }
  },

  getArtikelsById: async (req, res) => {
    try {
      const response = await Artikels.findOne({
        where: {
          id: req.params.id,
        },
      });
      if (response) {
        res.json({ result: response });
      } else {
        res.status(404).json({ error: "Artikels not found" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Failed to fetch Artikels" });
    }
  },

  createArtikels: async (req, res) => {
    console.log("ini req body", req.body)
    if (req.files === null)
      return res.status(400).json({ message: "No file Uploaded" });
    const titleArticle = req.body.titleArticle;
    const descArticle = req.body.descArticle; 
    const category = req.body.category;
    const hashtag = req.body.hashtag;
    const author = req.body.author;
    const date = req.body.date;
    const file = req.files.image;
    console.log (req.files);
    const fileSize = file.data.length;
    console.log ("ini",fileSize);
    const ext = path.extname(file.name);
    const fileName = file.md5 + ext;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    console.log (req.url)
    const allowedType = [".png", ".jpg", ".jpeg"];
    const desc1 = req.body.desc1
    const desc2 = req.body.desc2;
    const desc3 = req.body.desc3;
    const desc4 = req.body.desc4;
    const desc5 = req.body.desc5;
    const desc6 = req.body.desc6;
    const desc7 = req.body.desc7;
    const desc8 = req.body.desc8;
    const desc9 = req.body.desc9;
    const desc10 = req.body.desc10;


    if (!allowedType.includes(ext.toLowerCase()))
      return res.status(422).json({ message: "Invalid Images Type" });
    if (fileSize > 5000000)
      return res.status(422).json({ message: "Image size larger than 5 MB" });

    file.mv(`./public/artikel/${fileName}`, async (error) => {
      if (error) {
        return res.status(500).json({ message: error.message });
      }
      try {
        const newArtikels = await Artikels.create({
          titleArticle: titleArticle,
          descArticle: descArticle,
          category: category,
          hashtag: hashtag,
          author: author,
          date: date,
          image: fileName,
          url: url,
          desc1: desc1,
          desc2: desc2,
          desc3: desc3,
          desc4: desc4,
          desc5: desc5,
          desc6: desc6,
          desc7: desc7,
          desc8: desc8,
          desc9: desc9,
          desc10: desc10,
        });
        res.status(201).json({
          success: true,
          message: "Successfully Created Artikels",
          result: newArtikels,
        });
      } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
      }
    });
  },

  updateArtikels : async (req, res) => {
    try {
      const artikel = await Artikels.findOne({
        where: {
          id: req.params.id,
        },
      });
  // console.log(artikel);
      if (!artikel) {
        return res.status(404).json({ message: 'Data Not Found' });
      }
  
      let fileName = '';
      const file = req.files;
      console.log ("saya")
      

      // console.log ( typeof file)

      if (file === null) {
        fileName = artikel.image;
        // console.log("udah masuk null");
      } else {
        console.log(artikel.image);
        // console.log ("ini file", file)
        const fileSize = req.files.image.size;
        // console.log(req.files);
        const ext = path.extname(req.files.image.name);
        fileName = req.files.image.md5 + ext;
        const allowedTypes = ['.png', '.jpg', '.jpeg'];
  
        if (!allowedTypes.includes(ext.toLowerCase())) {
          return res.status(422).json({ message: 'Invalid Image Type' });
        }
        if (fileSize > 5000000) {
          return res.status(422).json({ message: 'Image size larger than 5 MB' });
        }
  // console.log(artikel);
     const filepath = `./public/artikel/${artikel.image}`;        
     fs.unlinkSync(filepath);

     req.files.image.mv(`./public/artikel/${fileName}`, (error) => {  
          if (error) {
            return res.status(500).json({ message: error.message });
          }
        });
      }
      const titleArticle = req.body.titleArticle;
      const descArticle = req.body.descArticle; 
      const category = req.body.category;
      const hashtag = req.body.hashtag;
      const author = req.body.author;
      const date = req.body.date;      
      const url = `${req.protocol}://${req.get('host')}/artikel/${fileName}`;
      const desc1 = req.body.desc1;
      const desc2 = req.body.desc2;    
      const desc3 = req.body.desc3;
      const desc4 = req.body.desc4;
      const desc5 = req.body.desc5;
      const desc6 = req.body.desc6;
      const desc7 = req.body.desc7;
      const desc8 = req.body.desc8;
      const desc9 = req.body.desc9;
      const desc10 = req.body.desc10;  
      await Artikels.update({
          titleArticle: titleArticle,
          descArticle: descArticle,
          category: category,
          hashtag: hashtag,
          author: author,
          date: date,
          image: fileName,
          url: url,
          desc1: desc1,
          desc2: desc2,
          desc3: desc3,
          desc4: desc4,
          desc5: desc5,
          desc6: desc6,
          desc7: desc7,
          desc8: desc8,
          desc9: desc9,
          desc10: desc10,
      },
      {
              where: {
              id: req.params.id,
                },
              }
      );
      res.status(200).json({
        message: 'Successfully Updated Artikels',
      });
    } catch (error) {
      console.log(req)

      console.log(error.message);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },
  

  // updateArtikels : async (req, res) => {
  //   try {
  //     const artikel = await Artikels.findOne({
  //       where: {
  //         id: req.params.id,
  //       },
  //     });
  
  //     if (!artikel) {
  //       return res.status(404).json({ message: 'Data Not Found' });
  //     }
  
  //     let fileName = '';
  //     if (req.file === null) {
  //       fileName = artikel.gambar;
  //     } else {
  //       const file = req.file;
  //       const fileSize = file.size;
  //       const ext = path.extname(file.originalname);
  //       fileName = file.filename + ext;
  //       const allowedTypes = ['.png', '.jpg', '.jpeg'];
  
  //       if (!allowedTypes.includes(ext.toLowerCase())) {
  //         return res.status(422).json({ message: 'Invalid Image Type' });
  //       }
  //       if (fileSize > 5000000) {
  //         return res.status(422).json({ message: 'Image size larger than 5 MB' });
  //       }
  
  //       const filepath = path.join(__dirname, '..', 'public', 'images', artikel.gambar);
  //       fs.unlinkSync(filepath);
  
  //       file.mv(path.join(__dirname, '..', 'public', 'images', fileName), (error) => {
  //         if (error) {
  //           return res.status(500).json({ message: error.message });
  //         }
  //       });
  //     }
  
  //     const name = req.body.title;
  //     const url = `${req.protocol}://${req.get('host')}/images/${fileName}`;
  
  //     await artikel.update({
  //       artikel_id : artikel_id,
  //         image: fileName,
  //         url: url,
  //         title: title,
  //         category: category,
  //         hashtag: hastag,
  //         author: author,
  //         desc: desc,
  //     },
  //     {
  //             where: {
  //             id: req.params.id,
  //               },
  //             }
  //     );
  
  //     res.status(200).json({
  //       message: 'Successfully Updated Artikels',
  //     });
  //   } catch (error) {
  //     console.log(error.message);
  //     res.status(500).json({ message: 'Internal Server Error' });
  //   }
  // }
  
  // updateArtikels: async (req, res) => {
  //   const Artikels = await Artikels.findOne({
  //     where: {
  //       id: req.params.id,
  //     },
  //   });
  //   if (!Artikels) return res.status(404).json({ message: "Data Not Found" });

  //   let fileName = "";
  //   if (req.file === null) {
  //     fileName = Artikels.gambar;
  //   } else {
  //     const file = req.files.file;
  //     const fileSize = file.data.lenght;
  //     const ext = path.extname(file.name);
  //     fileName = file.md5 + ext;
  //     const allowedType = [".png", ".jpg", ".jpeg"];

  //     if (!allowedType.includes(ext.toLowerCase()))
  //       return res.status(422).json({ message: "Invalid Images Type" });
  //     if (fileSize > 5000000)
  //       return res.status(422).json({ message: "Image size larger than 5 MB" });

  //     const filepath = `./public/images/${Artikels.gambar}`;
  //     fs.unlinkSync(filepath);

  //     file.mv(`./public/images/${fileName}`, (error) => {
  //       if (error) {
  //         return res.status(500).json({ message: error.message });
  //       }
  //     });
  //   }
  //   const name = req.body.title;
  //   const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
  //   try {
  //     await Artikels.update(
  //       { judul: name, gambar: fileName, url: url },
  //       {
  //         where: {
  //           id: req.params.id,
  //         },
  //       }
  //     );
  //     res.status(200).json({
  //       message: "Successfully Updated Product",
  //     });
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // },

  deleteArtikels : async (req, res) => {
    try {
      const artikel = await Artikels.findOne({
        where: {
          id: req.params.id,
        },
      });
  
      if (!artikel) {
        return res.status(404).json({ message: 'Data Not Found' });
      }
  
      const filepath = `./public/artikel/${artikel.image}`;
      console.log(artikel.image)
      fs.unlinkSync(filepath);
  
      await artikel.destroy({
        where: {
          id: req.params.id,
        }
      }
      );
      

  
      res.status(200).json({ message: 'Successfully Deleted Artikels' });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
};


export default ArtikelsController;