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
const { csrfProtection } = require('../config/csrfConfig');



router.post('/login', csrfProtection, auth.login);
router.post('/registrasi', csrfProtection, users.createUser)

// profile
router.get('/user/:id/transaction-history', verifyToken, users.transactionHistory)
router.get('/user/:id', verifyToken, users.findUserById);
router.post('/user', verifyToken, csrfProtection, users.createUser);
router.put('/user/:id', verifyToken, csrfProtection, users.updateUser);
router.delete('/user/:id', verifyToken, csrfProtection, users.deleteUser);

// car
router.get('/cars', verifyToken, carsOwners.index);
router.post('/car', verifyToken, csrfProtection, upload.single('file'), carsOwners.createCar)
router.get('/car/info-payment/:order_id/:transaction_id', verifyToken, carsOwners.infoPayment)
router.get('/car/user/:id', verifyToken, carsOwners.findCarByUserId)
router.get('/car/:id', verifyToken, carsOwners.findCarById)
router.put('/car/:id', verifyToken, csrfProtection, upload.single('file'), carsOwners.update)
router.delete('/car/:id', verifyToken, csrfProtection, carsOwners.deleteCars)

//api
router.get('/api-wilayah/province/', verifyToken, apiwilayah.getProvince)
router.get('/api-wilayah/regency/:province', verifyToken, apiwilayah.getRegency)
router.post('/api-midtrans', verifyToken, csrfProtection, apiMidtrans.midtransCheckout)
router.post('/api-midtrans/handle-notification', apiMidtrans.handleNotification)


module.exports = router;