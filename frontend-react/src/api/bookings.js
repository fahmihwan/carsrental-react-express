import apiClient from "./api";

export const getDetailBooking = async (order_id, transaction_id) => {
    try {
        const response = await apiClient.get(`/car/info-payment/${order_id}/${transaction_id}`)
        return response.data;
    } catch (error) {
        return error
    }
}