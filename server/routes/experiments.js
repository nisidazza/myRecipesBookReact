const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

require('dotenv').config()
mailgun = require('mailgun-js')({ apiKey: process.env.MAILGUN_API_KEY, domain: process.env.MAILGUN_DOMAIN})



const cloudinary = require('../cloudinaryConfig')

router.post("/upload", upload.single("myFile"), (req, res) => {
  console.log(req);
  cloudinary.uploader.upload(req.file.path)
  .then(image => {
      res.json({message : image.url})
  })
});


router.post('/email', (req,res) => {

  const data = {
    from: 'Excited User <me@samples.mailgun.org>',
    to: 'nisida.azzalini@gmail.com',
    subject: 'Hello',
    text: 'Testing some Mailgun awesomeness!'
  };
  mailgun.messages().send(data, function (error, mailgunResponse) {
    console.log(mailgunResponse);
  });
})




module.exports = router;
