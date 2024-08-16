const express = require('express')

const { validationResult } = require('express-validator')

const bcrypt = require('bcryptjs')

const jwt = require('jsonwebtoken')

const prisma = require("../../prisma/client")
const { json } = require('body-parser')

const login = async (req, res) => {
    try {
        const user = await prisma.user.findFirst({
            where: {
                email: req.body.email
            },
            select: {
                id: true,
                username: true,
                password: true,
                email: true,
            }
        })


        if (!user) {
            return res.status(404).json({
                success: false,
                message: "user not found"
            })
        }

        // compoare password
        const validPassword = await bcrypt.compare(req.body.password, user.password)

        if (!validPassword) {
            return res.status(401).json({
                success: false,
                message: "Invalid password",
            });
        }

        // generate token
        const token = jwt.sign({ id: user.id, }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        })


        const { password, ...userWithoutPassword } = user

        res.status(200).send({
            success: true,
            message: "Login successfully",
            data: {
                user: userWithoutPassword,
                token: token
            }
        })

    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        })
    }

}


module.exports = { login }