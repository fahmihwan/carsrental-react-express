const express = require('express')


const router = express.Router();
const carsOwners = require('../controllers/CarsOwnersController');
const users = require('../controllers/UserController')
const auth = require('../controllers/auth/AuthController')
const apiwilayah = require('../controllers/ApiWilayahIndonesia');


const multer = require('multer');
const path = require('path');
const { body } = require('express-validator');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, "./public/uploads")
    },
    filename: function (req, file, cb) {
        return cb(null, `${Date.now()}_${file.originalname}`)
    }
})

const upload = multer({ storage: storage })


router.post('/login', auth.login);

// router.get
router.get('/user/:id', users.findUserById);
router.post('/user', users.createUser);
router.put('/user/:id', users.updateUser);
router.delete('/user/:id', users.deleteUser);


router.get('/cars', carsOwners.index);


router.post('/car', upload.single('file'), carsOwners.createCar)
router.get('/car/:id', carsOwners.findCarById)
router.get('/car/user/:id', carsOwners.findCarByUserId)
router.put('/car/:id', upload.single('file'), carsOwners.update)
router.delete('/car/:id', carsOwners.deleteCars)


router.get('/api-wilayah/province/', apiwilayah.getProvince)
router.get('/api-wilayah/regency/:province', apiwilayah.getRegency)


module.exports = router;