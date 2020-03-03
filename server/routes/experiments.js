const express = require('express')
const router = express.Router()
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })

router.post('/upload', upload.single('myFile'), (req,res) => {
    console.log(req)
    res.json({
            message : req.file.path
        })
})



module.exports = router