const moment = require('moment')

// utils, per 2 jam naik 1.5
const calculateTimeForPrice = (jam) => {
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

const calculateTimeDifference = (date1, date2) => {
    const dateObj1 = new Date(date1);
    const dateObj2 = new Date(date2);
    const timeDifference = dateObj2 - dateObj1; // Selisih dalam milidetik
    const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));
    return hoursDifference  //satuan jam
}

const convertFormatDateTime = (valueDatepicker, valueFromTimePicker) => {
    let momentDate = moment(valueDatepicker).format("DD-MM-YYYY")
    const [hari, bulan, tahun] = momentDate.split('-')
    const [jam, menit] = valueFromTimePicker.split(":")
    const tanggal = new Date(tahun, bulan - 1, hari, jam, menit)
    const isoTgl = tanggal.toISOString()
    return isoTgl;
}

module.exports = { calculateTimeForPrice, calculateTimeDifference, convertFormatDateTime }