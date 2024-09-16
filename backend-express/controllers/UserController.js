const express = require('express')
const { validationResult } = require("express-validator")

const bcrypt = require('bcryptjs')
const { response } = require("express")
const prisma = require("../prisma/client")


const createUser = async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    // res.status(201).send(req.body)
    try {

        const user = await prisma.user.create({
            data: {
                username: req.body.username,
                email: req.body.email,
                password: hashedPassword,
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                phonenumber: req.body.phonenumber,
                statusenabled: true
            }
        })

        res.status(201).send({
            success: true,
            message: "user created successfully",
            data: user
        })

    } catch (error) {

        res.status(500).send({
            success: false,
            message: error.message,
        });
    }
}


const findUserById = async (req, res) => {

    //get ID from params
    const { id } = req.params;

    try {
        //get user by ID
        const user = await prisma.user.findUnique({
            where: {
                id: Number(id)
            }
        })

        res.status(200).send({
            success: true,
            message: `Get user by Id ${id}`,
            data: user,
        })

    } catch (error) {

        res.status(500).send({
            success: false,
            message: "Internal server error"
        })

    }
}


const updateUser = async (req, res) => {

    const { id } = req.params;

    let body = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        username: req.body.username,
        email: req.body.email,
        phonenumber: req.body.phonenumber
    }
    if (req.body.password) {
        body.password = await bcrypt.hash(req.body.password, 10)
    }

    try {
        const user = await prisma.user.update({
            where: {
                id: Number(id)
            }, data: body
        })
        res.status(200).send({
            success: true,
            message: 'User updated successfully',
            data: user,
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Internal server error",
        });

    }
}



const deleteUser = async (req, res) => {
    //get ID from params
    const { id } = req.params;

    try {
        //delete user
        await prisma.user.update({
            where: {
                id: Number(id),
            }, data: {
                statusenabled: false
            }
        });

        //send response
        res.status(200).send({
            success: true,
            message: 'User deleted successfully',
        });

    } catch (error) {
        res.status(500).send({
            success: false,
            message: error,
        });
    }
}
const transactionHistory = async (req, res) => {
    //get ID from params
    const { id } = req.params;

    try {
        const page = Number(req.query.page) || 1 // Halaman saat ini, default 1
        const limit = Number(req.query.limit) || 10 // Jumlah item per halaman, default 10

        // hitung offset
        const offset = (page - 1) * limit

        const items = await prisma.$queryRaw`select co.merk, co.file, b.pickup_location, b.m_bank, b.m_transaction_status, b.m_va_number, b.m_gross_amount from bookings b
                    inner join cars_owners co on co.id  = b.cars_owner_id 
                    where b.user_id = 1
                    LIMIT ${limit} OFFSET ${offset}`

        let totalItems = await prisma.$queryRaw`SELECT COUNT(*) as totalItems  FROM bookings`;
        totalItems = Number(totalItems[0].totalitems)
        res.status(200).send({
            success: true,
            page,
            limit,
            totalItems: totalItems,
            totalPages: Math.ceil(totalItems / limit),
            items
        })

    } catch (error) {
        console.log(error.message);
        res.status(500).send({
            success: false,
            message: "Internal server error " + error.message
        })

    }
}

module.exports = { findUserById, createUser, updateUser, deleteUser, transactionHistory }

