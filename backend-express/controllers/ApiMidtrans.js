const midtransClient = require('midtrans-client');

const midtransPayment = async (req, res) => {


    let parameter = {
        payment_type: 'bank_transfer',
        transaction_details: {
            order_id: 'order-111',
            gross_amount: 10000
        },
    }
    if (req.body.bank == 'BCA') {
        parameter.bank_transfer = {}
        parameter.bank_transfer.bank = 'bca'
    }
    if (req.body.bank == 'BNI') {
        parameter.bank_transfer = {}
        parameter.bank_transfer.bank = 'bni'
    }
    if (req.body.bank == 'BRI') {
        parameter.bank_transfer = {}
        parameter.bank_transfer.bank = 'bri'
    }
    if (req.body.bank == 'MANDIRI') {
        parameter.echannel.bill_info1 = 'Payment'
        parameter.echannel.bill_info1 = 'Online purchase'
    }




    res.status(200).send(parameter)
    return

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


}

module.exports = { midtransPayment }