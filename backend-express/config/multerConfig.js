const multer = require("multer")
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, "./public/uploads")
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname)
        return cb(null, `${Date.now()}${ext}`)
    }
})

const upload = multer({ storage: storage })


module.exports = upload