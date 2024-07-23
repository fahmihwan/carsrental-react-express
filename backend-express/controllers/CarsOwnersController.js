const express = require("express");

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

        const car = await prisma.cars_owners.create({
            data: {
                merk: req.body.merk,
                daily_rental_price: Number(req.body.daily_rental_price),
                license_plate: req.body.license_plate,
                year: req.body.year,
                statusenabled: true,
                user_id: Number(req.body.user_id),
            },
        })

        res.status(201).send({
            success: true, message: "cars created successfully", data: car
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

    //get ID from params
    const { id } = req.params;

    try {

        const user = await prisma.cars_owners.update({
            where: {
                id: Number(id)
            }, data: {
                merk: req.body.merk,
                daily_rental_price: Number(req.body.daily_rental_price),
                license_plate: req.body.license_plate,
                year: req.body.year,
                user_id: 1
            }
        })
        //send response
        res.status(200).send({
            success: true,
            message: 'cars updated successfully',
            data: user,
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Internal server error",
        });

    }
}



const deleteCars = async (req, res) => {
    //get ID from params
    const { id } = req.params;

    try {

        //delete user
        await prisma.cars_owners.update({
            where: {
                id: Number(id),
            }, data: {
                statusenabled: false
            }
        });

        //send response
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