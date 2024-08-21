const express = require("express");
const multer = require('multer');
const path = require('path');
const fs = require('fs');



const prisma = require("../prisma/client")



const index = async (req, res) => {

    const result = await prisma.$queryRaw`SELECT * FROM cars_owners WHERE statusenabled=true`
    res.status(200).send({
        data: result,
        success: true,
        message: 'list car',
    })
}

const findCarByUserId = async (req, res) => {
    const { id } = req.params;

    const result = await prisma.$queryRaw`SELECT * FROM cars_owners WHERE statusenabled=true AND user_id=${Number(id)} order by created_at desc`

    res.status(200).send({
        data: result,
        success: true,
        message: 'list car by user',
    })
}


const createCar = async (req, res) => {

    try {

        const image = req.file ? req.file.filename : '';

        const car = await prisma.cars_owners.create({
            data: {
                user_id: Number(req.body.user_id),
                daily_rental_price: Number(req.body.daily_rental_price),
                merk: req.body.merk,
                year: req.body.year,
                license_plate: req.body.license_plate,
                address: req.body.address,
                statusenabled: true,
                file: image,
            },
        })

        // const file = req.file.path
        res.status(201).send({
            success: true, message: "cars created successfully",
        })

    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
}

const findCarById = async (req, res) => {
    const { id } = req.params;

    try {
        //get user by ID
        const user = await prisma.cars_owners.findUnique({
            where: {
                id: Number(id)
            }
        })

        res.status(200).send({
            success: true,
            message: `Get Car by Id ${id}`,
            data: user,
        })

    } catch (error) {

        res.status(500).send({
            success: false,
            message: "Internal server error"
        })

    }

}


const update = async (req, res) => {

    const { id } = req.params;

    try {
        const isfileExist = await prisma.cars_owners.findFirst({
            where: { id: Number(id) }
        })

        if (req.file) {
            const filePath = "./public/uploads/" + isfileExist.file
            fs.unlink(filePath, (err) => { })
        }

        let payload = {
            daily_rental_price: Number(req.body.daily_rental_price),
            merk: req.body.merk,
            year: req.body.year,
            license_plate: req.body.license_plate,
            address: req.body.address,
            statusenabled: true,
        }
        if (req.file) {
            payload.file = req.file.filename
        }
        const user = await prisma.cars_owners.update({
            where: {
                id: Number(id)
            }, data: payload
        })

        res.status(200).send({
            success: true,
            message: 'cars updated successfully',
            data: user,
        });
    } catch (error) {
        // console.log(error);
        res.status(500).send({
            success: false,
            message: "Internal server error : " + error,
        });

    }
}



const deleteCars = async (req, res) => {
    //get ID from params
    const { id } = req.params;

    try {

        //delete user   
        const del = await prisma.cars_owners.update({
            where: {
                id: Number(id),
            }, data: {
                statusenabled: false
            }
        });
        if (del.file) {
            const filePath = "./public/uploads/" + del.file
            fs.unlink(filePath, (err) => {
                if (err) {
                    throw new Error("Error removing " + err)
                }
            })
        }
        res.status(200).send({
            success: true,
            message: 'Cars deleted successfully',
        });

    } catch (error) {
        res.status(500).send({
            success: false,
            message: error,
        });
    }
}

module.exports = { index, createCar, deleteCars, update, findCarById, findCarByUserId }