const express = require('express')
const { validationResult } = require("express-validator")

const bcrypt = require('bcryptjs')
const { response } = require("express")
const prisma = require("../prisma/client")


const createUser = async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
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
            message: error,
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

module.exports = { findUserById, createUser, updateUser, deleteUser }