import apiClient from "./api";
import { csrfToken } from "./csrftoken";

export const getDetailBooking = async (order_id, transaction_id) => {
    try {
        const response = await apiClient.get(`/car/info-payment/${order_id}/${transaction_id}`)
        return response.data;
    } catch (error) {
        return error
    }
}

export const createBookNow = async (payload) => {

    try {
        await csrfToken()
        const response = await apiClient.post('api-midtrans', payload)
        return response.data
    } catch (error) {
        return error
    }

}


// let payload = {
//     bank: paymentMethod,
//     carId: car.id,
//     userId: userId,
//     startDate: startedBooking.pickUpDate,
//     endDate: startedBooking.dropOffDate,
//     pickUpTime: startedBooking.pickUpTime,
//     dropOffTime: startedBooking.dropOffTime
// }
// const response = await fetch(`http://localhost:3000/api/api-midtrans`, {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(payload)
// })
// const data = await response.json()