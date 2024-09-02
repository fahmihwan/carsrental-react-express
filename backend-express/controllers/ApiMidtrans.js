const midtransClient = require('midtrans-client');

const prisma = require("../prisma/client")
const moment = require('moment')
const { v4: uuidv4 } = require('uuid');

const midtransPayment = async (req, res) => {

    try {
        let payload = {
            carId: 6,
            userId: 1,
            bank: 'BCA', //req.body.bank
            dateRange: req.body.dateRange,
            pickUpTime: req.body.pickUpTime,
            dropOffTime: req.body.dropOffTime
        }
        // ==== MODEL ========================================================================================================================
        // get model
        let cars = await prisma.$queryRaw`SELECT id,
            daily_rental_price as price,
            daily_rental_price,  
            merk as name
         FROM cars_owners WHERE id = ${Number(payload.carId)}`
        cars = cars[0]


        const user = await prisma.user.findFirst({
            where: { id: Number(payload.userId) }
        })
        // ==== CALCULATE DATE TIME to PRICE ========================================================================================================================
        // utils
        function makeFormatDateTime(valueDatepicker, valueFromTimePicker) {
            let momentDate = moment(valueDatepicker).format("DD-MM-YYYY")
            const [hari, bulan, tahun] = momentDate.split('-')
            const [jam, menit] = valueFromTimePicker.split(":")
            const tanggal = new Date(tahun, bulan - 1, hari, jam, menit)
            const isoTgl = tanggal.toISOString()
            return isoTgl;
        }

        // utils
        function calculateTimeDifference(date1, date2) {
            const dateObj1 = new Date(date1);
            const dateObj2 = new Date(date2);
            const timeDifference = dateObj2 - dateObj1; // Selisih dalam milidetik
            const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));
            return hoursDifference  //satuan jam
        }


        //  NOTED : jika lebih dari 12 jam di hitung nambah hari, jka kurang dari 12 jam di hitung hari ini saja
        let formulaQtyMidtrans = 0;
        if (payload.dateRange?.startDate != undefined) {
            let startDate = makeFormatDateTime(payload.dateRange.startDate, payload.pickUpTime)
            let endDate = makeFormatDateTime(payload.dateRange.endDate, payload.dropOffTime)
            const difference = calculateTimeDifference(startDate, endDate);

            //utils, per 2 jam naik 1.5 
            function calculateTimeForPrice(jam) {
                const jamPerHari = 24;
                if (jam < 24) {
                    return 1;
                }
                const hariPenuh = Math.floor(jam / jamPerHari);
                const sisaJam = jam % jamPerHari;
                const desimalHari = sisaJam / jamPerHari;
                const hasil = hariPenuh + desimalHari;
                return Math.round(hasil)
            }

            formulaQtyMidtrans = calculateTimeForPrice(difference).toFixed(1)
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







        // res.status(200).send(parameter)
        // return

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
            .then(res => res.json())
            .then(data => {
                res.status(200).send({
                    data: data
                })

            }).catch(error => {
                res.status(500).send({
                    data: error
                })
            });

    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        })
    }

}

module.exports = { midtransPayment }