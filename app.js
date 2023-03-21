// SyncU
// https://syncu.me

const mongoose = require("mongoose");
require("dotenv").config();

// const Grid = require("gridfs-stream");
const express = require("express");
// const upload = require("./middleware/upload");
// const multer = require("multer");
const bodyParser = require("body-parser");
const path = require("path");
const session = require("express-session");
const app = express();
const mainRoutes = require("./router/mainRoutes");
app.set("view engine", "ejs");
app.set("views", "views");
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, application/json"
  );
  next();
});
// const upload1 = multer({ dest: "uploads/" });

// let gfs;

// const conn = mongoose.connection;
// conn.once("open", function () {
//   gfs = Grid(conn.db, mongoose.mongo);
//   gfs.collection("photos");
// });
// app.get("/file/:filename", async (req, res) => {
//   try {
//     const file = await gfs.files.findOne({ filename: req.params.filename });
//     const readStream = gfs.createReadStream(file.filename);
//     readStream.pipe(res);
//   } catch (error) {
//     res.send("not found");
//   }
// });

// app.delete("/file/:filename", async (req, res) => {
//   try {
//     await gfs.files.deleteOne({ filename: req.params.filename });
//     res.send("success");
//   } catch (error) {
//     console.log(error);
//     res.send("An error occured.");
//   }
// });
// app.post("/upload", upload1.single("image"), (req, res) => {
//   // handle file upload
// });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname + "public")));
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
// app.post("/upload", upload1.single("image"), (req, res) => {
//   const newImage = new Image({
//     name: req.file.originalname,
//     data: req.file.buffer,
//     contentType: req.file.mimetype,
//   });

//   newImage.save((err, image) => {
//     if (err) {
//       res.status(500).send(err);
//     } else {
//       res.send(image);
//     }
//   });
// });

// app.use("/file", upload);
app.use("/", mainRoutes);
app.get("/", (req, res) => {
  res.render("index");
});
app.use(express.static(path.join(__dirname, "public")));

const url = process.env.URL;

try {
  mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log("Connected Successfully to the DataBase");
  app.listen(process.env.PORT || 3000);
} catch (err) {
  console.log(err);
}
