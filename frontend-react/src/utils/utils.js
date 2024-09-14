import moment from "moment";

export const fCalculateToHour = (date1, date2) => {
    const dateObj1 = new Date(date1);
    const dateObj2 = new Date(date2);
    const timeDifference = dateObj2 - dateObj1; // Selisih dalam milidetik
    const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));
    return hoursDifference  //satuan jam
}

//     //  NOTED : jika lebih dari 12 jam di hitung nambah hari, jka kurang dari 12 jam di hitung hari ini saja
export const fMakeFormatDateTime = (valueDatepicker, valueFromTimePicker) => {
    let momentDate = moment(valueDatepicker).format("DD-MM-YYYY")
    const [hari, bulan, tahun] = momentDate.split('-')
    const [jam, menit] = valueFromTimePicker.split(":")
    const tanggal = new Date(tahun, bulan - 1, hari, jam, menit)
    const isoTgl = tanggal.toISOString()
    return isoTgl;
}

// utils, per 2 jam naik 1.5 
export const fCalculateTimeForPrice = (jam) => {
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

export const fFormatRupiah = (number) => {
    let format = new Intl.NumberFormat('id-ID', {
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(number);
    return format
}


export const fGeneratePaginationNumber = (paginatePage, paginateTotalPage, paginateLimit) => {
    const pageNumbers = [];
    const maxPagesToShow = paginateLimit;
    let startPage = Math.max(1, paginatePage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(paginateTotalPage, startPage + maxPagesToShow - 1);
    if (endPage - startPage + 1 < maxPagesToShow) {
        startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }
    for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
    }
    return pageNumbers
}

export const fCalculatePaginateIteration = (paginatePage, maxPagesToShow) => {
    return (paginatePage - 1) * maxPagesToShow + 1;
}