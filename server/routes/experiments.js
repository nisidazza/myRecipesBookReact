const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const cloudinary = require('../cloudinaryConfig')

router.post("/upload", upload.single("myFile"), (req, res) => {
  console.log(req);
  cloudinary.uploader.upload(req.file.path)
  .then(image => {
      res.json({message : image.url})
  })
});

module.exports = router;
