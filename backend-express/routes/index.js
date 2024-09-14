const express = require('express')


const router = express.Router();
const carsOwners = require('../controllers/CarsOwnersController');
const users = require('../controllers/UserController')
const auth = require('../controllers/auth/AuthController')
const apiwilayah = require('../controllers/ApiWilayahIndonesia');
const apiMidtrans = require('../controllers/ApiMidtrans');
const upload = require('../config/multerConfig');
const verifyToken = require('../middleware/auth');
const { body } = require('express-validator');



router.post('/login', auth.login);

// profile
router.get('/user/:id', verifyToken, users.findUserById);
router.post('/user', verifyToken, users.createUser);
router.put('/user/:id', verifyToken, users.updateUser);
router.delete('/user/:id', verifyToken, users.deleteUser);

// car
router.get('/cars', verifyToken, carsOwners.index);
router.post('/car', verifyToken, upload.single('file'), carsOwners.createCar)
router.get('/car/info-payment/:order_id/:transaction_id', verifyToken, carsOwners.infoPayment)
router.get('/car/user/:id', verifyToken, carsOwners.findCarByUserId)
router.get('/car/:id', verifyToken, carsOwners.findCarById)
router.put('/car/:id', verifyToken, upload.single('file'), carsOwners.update)
router.delete('/car/:id', verifyToken, carsOwners.deleteCars)

//api
router.get('/api-wilayah/province/', verifyToken, apiwilayah.getProvince)
router.get('/api-wilayah/regency/:province', verifyToken, apiwilayah.getRegency)
router.post('/api-midtrans', verifyToken, apiMidtrans.midtransCheckout)
router.post('/api-midtrans/handle-notification', verifyToken, apiMidtrans.handleNotification)


module.exports = router;