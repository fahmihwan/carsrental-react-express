const midtransClient = require('midtrans-client');




const midtransPayment = async (req, res) => {

    // // Data untuk request
    const data = {
        payment_type: 'bank_transfer',
        transaction_details: {
            order_id: 'order-102',
            gross_amount: 44000
        },
        bank_transfer: {
            bank: 'bca'
        }
    };

    const encodedKey = Buffer.from('SB-Mid-server-l4ja6huIEGPSjPi5oGsTKesl').toString('base64');

    // Melakukan POST request ke Midtrans
    fetch('https://api.sandbox.midtrans.com/v2/charge', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': `Basic ${encodedKey}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
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