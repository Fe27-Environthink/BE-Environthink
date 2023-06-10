import express from "express";
import bodyParser from "body-parser";
import FileUpload from "express-fileupload";
import cors from "cors";
import artikelRoute from "./routes/artikelRoute.js";
import roleRoute from "./routes/roleRoute.js";
import aksiRoute from "./routes/aksiRoute.js";
import komentarRoute from "./routes/komentarRoute.js";
import kontribusiRoute from "./routes/kontribusiRoute.js";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(FileUpload());
app.use(express.static("public"));
app.use(artikelRoute);
app.use(roleRoute);
app.use(aksiRoute);
app.use(komentarRoute);
app.use(kontribusiRoute);

app.listen(3000, ()=> console.log('server up cuy'));