const apiUrl = 'http://localhost:3000/api';

export const getDetailBooking = async () => {
    try {
        const response = await fetch(`${apiUrl}/car/info-payment`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json()
        return data;
    } catch (error) {
        return error
    }
}