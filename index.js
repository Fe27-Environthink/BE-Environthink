const express = require("express");
const FileUpload = require("express-fileupload");
const cors = require("cors");
const dotenv = require("dotenv");
const infografisRoute = require("./routes/infografisRoute.js");
const userRoute = require("./routes/userRoute.js");
const donasiRoute = require("./routes/donasiRoute.js");
const artikelRoute = require("./routes/artikelRoute.js");
const aksiRoute = require("./routes/aksiRoute.js");
const komentarRoute = require("./routes/komentarRoute.js");
const kontribusiRoute = require("./routes/kontribusiRoute.js");

dotenv.config();

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
// app.use(FileUpload());
app.use(
  FileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/images",
  })
);
app.use(express.static("assets"));

app.use(infografisRoute);
app.use(userRoute);
app.use(donasiRoute);
app.use(artikelRoute);
app.use(aksiRoute);
app.use(komentarRoute);
app.use(kontribusiRoute);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
