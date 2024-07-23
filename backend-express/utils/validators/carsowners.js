const { body } = require("express-validator");


const validateCarsOwners = [
    body('merk').notEmpty().withMessage('Name is required'),
    body('daily_rental_price').notEmpty().withMessage('Name is required').isNumeric('price is invalid'),
    body('license_plate').notEmpty().withMessage('license_plate is required'),
    body('year').notEmpty().withMessage('year is required'),
]

module.exports = { validateCarsOwners }


//name:sdsdsd
// daily_rental_price:20000
// merk:tes
// license_plate:ae1000ee
// year:2020
// user_id:1