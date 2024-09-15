const midtransClient = require('midtrans-client');

const prisma = require("../prisma/client")

const { v4: uuidv4 } = require('uuid');
const crypto = require('crypto');
const { calculateTimeForPrice, convertFormatDateTime, calculateTimeDifference } = require('../utils/utils');
const { send } = require('process');


const midtransCheckout = async (req, res) => {


    try {
        let payload = {
            carId: Number(req.body.carId),
            userId: Number(req.body.userId),
            bank: req.body.bank, //req.body.bank
            dateRange: {
                startDate: req.body.startDate,
                endDate: req.body.endDate,
            },
            pickUpTime: req.body.pickUpTime,
            dropOffTime: req.body.dropOffTime,
            pickupLocation: req.body.pickupLocation,
        }

        // ==== MODEL ========================================================================================================================
        // get model
        let cars = await prisma.$queryRaw`SELECT id, daily_rental_price as price, daily_rental_price, merk as name
         FROM cars_owners WHERE id = ${Number(payload.carId)}`
        cars = cars[0]

        const user = await prisma.user.findFirst({
            where: { id: Number(payload.userId) }
        })
        // ==== CALCULATE DATE TIME to PRICE ========================================================================================================================

        //  NOTED : jika lebih dari 12 jam di hitung nambah hari, jka kurang dari 12 jam di hitung hari ini saja
        let formulaQtyMidtrans = 0;
        if (payload.dateRange?.startDate != undefined) {
            let startDateTime = convertFormatDateTime(payload.dateRange.startDate, payload.pickUpTime)
            let endDateTime = convertFormatDateTime(payload.dateRange.endDate, payload.dropOffTime)
            const difference = calculateTimeDifference(startDateTime, endDateTime);

            formulaQtyMidtrans = calculateTimeForPrice(difference)
        } else {
            throw new Error("date range is null")
        }
        // variabel 
        let price = formulaQtyMidtrans * cars.daily_rental_price;

        // ==== PAYLOADS MIDTRANS =======================================================================================================================
        let billingAddres = {
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            phone: user.phonenumber,
            address: user?.address
        }

        let parameter = {
            payment_type: 'bank_transfer',
            transaction_details: {
                order_id: uuidv4(),
                gross_amount: Number(price)
            },
            "item_details": [{
                "id": cars.id,
                "price": Number(cars.daily_rental_price),
                "quantity": Number(formulaQtyMidtrans),
                "name": cars.name,
            }],
            "customer_details": billingAddres,
        }

        if (payload.bank == 'BCA') {
            parameter.bank_transfer = {}
            parameter.bank_transfer.bank = 'bca'
        }
        if (payload.bank == 'BNI') {
            parameter.bank_transfer = {}
            parameter.bank_transfer.bank = 'bni'
        }
        if (payload.bank == 'BRI') {
            parameter.bank_transfer = {}
            parameter.bank_transfer.bank = 'bri'
        }
        if (payload.bank == 'MANDIRI') {
            parameter.echannel.bill_info1 = 'Payment'
            parameter.echannel.bill_info1 = 'Online purchase'
        }



        const encodedKey = Buffer.from('SB-Mid-server-l4ja6huIEGPSjPi5oGsTKesl').toString('base64');

        fetch('https://api.sandbox.midtrans.com/v2/charge', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Basic ${encodedKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(parameter)
        })
            .then(resMidtrans => resMidtrans.json())
            .then(async (resMidtrans) => {

                const booking = await prisma.bookings.create({
                    data: {
                        statusenabled: true,
                        user_id: Number(payload.userId), // Assuming an integer user ID
                        cars_owner_id: Number(payload.carId), // Assuming an integer car owner ID
                        pickup_location: payload.pickupLocation,
                        dropoff_location: payload.pickupLocation,
                        pickup_schedule: payload.dateRange.startDate, // Assuming current timestamp
                        dropoff_schedule: payload.dateRange.endDate, // Example future date
                        m_expiry_time: new Date(resMidtrans?.expiry_time).toISOString(),
                        m_fraud_status: resMidtrans?.fraud_status,
                        m_gross_amount: Number(resMidtrans?.gross_amount),
                        m_order_id: resMidtrans?.order_id,
                        m_merchant_id: resMidtrans?.merchant_id,
                        m_payment_type: resMidtrans?.payment_type,
                        m_bank: resMidtrans?.va_numbers[0]?.bank,
                        m_va_number: resMidtrans?.va_numbers[0]?.va_number,
                        m_bill_key: resMidtrans?.bill_key,
                        m_biller_code: resMidtrans?.biller_code,
                        m_permata_va_number: resMidtrans?.permata_va_number,
                        m_transaction_id: resMidtrans?.transaction_id,
                        m_transaction_status: resMidtrans?.transaction_status,
                    },
                })

                res.status(200).send({
                    data: booking,
                })

            }).catch(error => {
                res.status(500).send({
                    data: error.message
                })
            });

    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        })
    }
}




const handleNotification2 = async (req, res) => {




    // const logs = await prisma.logging.create({
    //     data: {
    //         logs: JSON.stringify(req.body)
    //     },
    // })
    // return

    // Buat hash SHA512
    // Data yang ingin di-hash
    const order_id = req.body.order_id;
    const status_code = req.body.status_code;
    const gross_amount = req.body.gross_amount;
    const serverkey = 'SB-Mid-server-l4ja6huIEGPSjPi5oGsTKesl';
    // Gabungkan data
    const data = order_id + status_code + gross_amount + serverkey;
    // Buat hash SHA512
    const encodedKey = crypto.createHash('sha512').update(data).digest('hex');

    if (encodedKey != req.body.signature_key) {
        //  response fail
    }

    // samakan kode diatas dengan data signatur yang sudah di post midtrans, jika gagal force error
    // const encodedKey = Buffer.from('SB-Mid-server-l4ja6huIEGPSjPi5oGsTKesl').toString('base64');

    fetch('https://app.sandbox.midtrans.com/snap/v1/transactions', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': `Basic ${encodedKey}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(req.body)
    }).
        then((resMidtrans) => resMidtrans.json())
        .then(async (statusResponse) => {
            let orderId = statusResponse.order_id;
            let transactionStatus = statusResponse.transaction_status;
            let fraudStatus = statusResponse.fraud_status;


            payload = {}
            // Sample transactionStatus handling logic
            if (transactionStatus == 'capture') {
                if (fraudStatus == 'accept') {
                    // TODO set transaction status on your database to 'success'
                    payload.transaction_status = transactionStatus
                }
            } else if (transactionStatus == 'settlement') {
                // TODO set transaction status on your database to 'success'
                payload.transaction_status = transactionStatus

            } else if (transactionStatus == 'cancel' || transactionStatus == 'deny' || transactionStatus == 'expire') {
                // TODO set transaction status on your database to 'failure'
                payload.transaction_status = transactionStatus
            } else if (transactionStatus == 'pending') {
                // TODO set transaction status on your database to 'pending' / waiting payment
                payload.transaction_status = transactionStatus
            }
            payload.settlement_time = statusResponse?.settlement_time

            const booking = await prisma.bookings.update({
                where: {
                    m_transaction_id: statusResponse?.transaction_id,
                }, data: payload
            })


            const logs = await prisma.logging.create({
                data: {
                    logs: JSON.stringify(req.body)
                },
            })

            res.status(200).send({
                message: 'payment has successfully'
            })
        }).catch((err) => {
            res.status(500).send({
                message: 'payment failed : ' + err
            })
        })
}


const handleNotification = async (req, res) => {

    try {

        let apiClient = new midtransClient.Snap({
            isProduction: false,
            serverKey: 'SB-Mid-server-l4ja6huIEGPSjPi5oGsTKesl',
            clientKey: 'SB-Mid-client-jzzzQlbkuYuOT2hI'
        });


        apiClient.transaction.notification(req.body)
            .then(async (statusResponse) => {
                let orderId = statusResponse.order_id;
                let transactionStatus = statusResponse.transaction_status;
                let fraudStatus = statusResponse.fraud_status;

                const logs = await prisma.logging.create({
                    data: {
                        logs: JSON.stringify(statusResponse)
                    },
                })
                console.log(`Transaction notification received. Order ID: ${orderId}. Transaction status: ${transactionStatus}. Fraud status: ${fraudStatus}`);

                // Sample transactionStatus handling logic
                let payload = {}
                // Sample transactionStatus handling logic
                if (transactionStatus == 'capture') {
                    if (fraudStatus == 'accept') {
                        // TODO set transaction status on your database to 'success'
                        payload.m_transaction_status = transactionStatus
                    }
                } else if (transactionStatus == 'settlement') {
                    // TODO set transaction status on your database to 'success'
                    payload.m_transaction_status = transactionStatus

                } else if (transactionStatus == 'cancel' || transactionStatus == 'deny' || transactionStatus == 'expire') {
                    // TODO set transaction status on your database to 'failure'
                    payload.m_transaction_status = transactionStatus
                } else if (transactionStatus == 'pending') {
                    // TODO set transaction status on your database to 'pending' / waiting payment
                    payload.m_transaction_status = transactionStatus
                }
                // payload.m_settlement_time = new Date(statusResponse?.settlement_time).toISOString()

                const booking = await prisma.bookings.updateMany({
                    where: {
                        m_transaction_id: statusResponse?.transaction_id,
                    }, data: payload
                })

                res.status(200).send({
                    'message': 'ok'
                })
            })
        // .catch(async (err) => {
        // });

    } catch (error) {
        const logs = await prisma.logging.create({
            data: {
                logs: JSON.stringify(error.message)
            },
        })
    }


    // let cek = {
    //     "status_code": "200",
    //     "transaction_id": "a6bbda86-0192-4cef-b336-562553613c2d",
    //     "gross_amount": "100000.00",
    //     "currency": "IDR",
    //     "order_id": "d7855dfb-1b2e-49fa-ade0-8ed67c3d9c62",
    //     "payment_type": "bank_transfer",
    //     "signature_key": "41053109b1eeea2434da26b410a6ff66bfa00973e2ed7bef30f66cbd1ac135ef115e35146b79ca7b0f98d8d30014f7a58189631523e2fa9272d07c81141a9fc7",
    //     "transaction_status": "settlement",
    //     "fraud_status": "accept",
    //     "status_message": "Success, transaction is found",
    //     "merchant_id": "G626084946",
    //     "va_numbers": [{ "bank": "bca", "va_number": "84946242623" }],
    //     "payment_amounts": [],
    //     "transaction_time": "2024-09-11 05:12:55",
    //     "settlement_time": "2024-09-11 05:13:10",
    //     "expiry_time": "2024-09-12 05:12:55"
    // }

}

module.exports = { midtransCheckout, handleNotification }