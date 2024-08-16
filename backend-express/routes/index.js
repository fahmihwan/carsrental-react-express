const express = require('express')


const router = express.Router();
const carsOwners = require('../controllers/CarsOwnersController');
const users = require('../controllers/UserController')
const auth = require('../controllers/auth/AuthController')
const apiwilayah = require('../controllers/ApiWilayahIndonesia')

router.post('/login', auth.login);

// router.get
router.get('/user/:id', users.findUserById);
router.post('/user', users.createUser);
router.put('/user/:id', users.updateUser);
router.delete('/user/:id', users.deleteUser);


router.get('/cars', carsOwners.index);
router.post('/car', carsOwners.createCar)
router.get('/car/:id', carsOwners.findCarById)
router.get('/car/user/:id', carsOwners.findCarByUserId)
router.put('/car/:id', carsOwners.update)
router.delete('/car/:id', carsOwners.deleteCars)


router.get('/api-wilayah/province/', apiwilayah.getProvince)
router.get('/api-wilayah/regency/:province', apiwilayah.getRegency)


module.exports = router;