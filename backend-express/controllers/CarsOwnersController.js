const express = require("express");
const multer = require('multer');
const path = require('path');
const fs = require('fs');



const prisma = require("../prisma/client")



const index = async (req, res) => {

    // logikanya, jika mobil add di daerah yang sama, munculkan
    // jika mobil itu statusnya masih di sewa dari tanggal sekian sampai sekian, jgn munculkan
    const result = await prisma.$queryRaw`SELECT co.*, string_agg(f.features_name || ' ~ ' || f.type_features ,', ') as features FROM cars_owners co 
                    inner join car_features cf on cf.cars_owner_id = co.id
                    inner join features f ON f.id = cf.features_id 
                    WHERE co.statusenabled=true
                    and co.address ilike '%DKI JAKARTA%'
                    group by co.id, co.statusenabled, co.user_id, co.daily_rental_price, co.merk, co.year,
                    co.license_plate, co.address, co.created_at, co.file`

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



const infoPayment = async (req, res) => {
    const data = await prisma.$queryRaw`select 
                bk.id,co.merk,co.year,co.license_plate,co.file,co.daily_rental_price,
                co.address,bk.pickup_location,bk.dropoff_location,bk.pickup_schedule, bk.dropoff_schedule,bk.dropoff_schedule,
                string_agg(f.features_name || ' ~ ' || f.type_features ,', ') as features,
                bk.m_bank,bk.m_bill_key,bk.m_biller_code,
                bk.m_expiry_time,bk.m_fraud_status,bk.m_gross_amount,
                bk.m_merchant_id,bk.m_order_id,bk.m_payment_type,bk.m_permata_va_number,
                bk.m_transaction_id,bk.m_transaction_status,bk.m_va_number 
            from bookings bk
            inner join users usr on bk.user_id = usr.id
            inner join cars_owners co  on bk.cars_owner_id = co.id 
            left join car_features cf on co.id = cf.cars_owner_id
            left join features f on f.id = cf.features_id 
            where bk.user_id =1
           	group by bk.id,
           	co.address,co.merk, co.year, co.license_plate, co.file,co.daily_rental_price, bk.pickup_location,
                bk.dropoff_location,bk.dropoff_schedule,bk.dropoff_schedule, bk.pickup_schedule,
                bk.m_bank,bk.m_bill_key,bk.m_biller_code,bk.m_expiry_time,bk.m_fraud_status,
                bk.m_gross_amount,bk.m_merchant_id,bk.m_order_id,bk.m_payment_type,
                bk.m_permata_va_number,bk.m_transaction_id,bk.m_transaction_status,bk.m_va_number`;

    res.status(200).send({
        data: data
    })

}

module.exports = { index, createCar, deleteCars, update, findCarById, findCarByUserId, infoPayment }