const apiUrl = 'http://localhost:3000/api';

export const getCars = async () => {
    try {
        const response = await fetch(`${apiUrl}/cars`, {
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

export const createCar = async (payload) => {
    const formData = new FormData()
    formData.append('daily_rental_price', payload.daily_rental_price)
    formData.append('merk', payload.merk)
    formData.append('user_id', payload.user_id)
    formData.append('license_plate', payload.license_plate)
    formData.append('year', payload.year)
    formData.append('file', payload.file)
    formData.append('addres', addres)

    try {
        const response = await fetch(`${apiUrl}/car`, {
            method: 'POST',
            body: formData,
        })

        const data = await response.json()
        return data;
    } catch (error) {
        return error;
    }

}

export const findCarByUserId = async (id) => {
    try {
        const response = await fetch(`${apiUrl}/car/user/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await response.json()
        return data
    } catch (error) {
        return error;
    }
}

export const findCarById = async (id) => {
    try {
        const response = await fetch(`${apiUrl}/car/${id}`, {
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


export const deleteCarById = async (id) => {
    try {
        const response = await fetch(`${apiUrl}/car/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        const data = await response.json()
        return data
    } catch (error) {
        return error;
    }
}


export const updateCar = async (id, payload) => {

    const formData = new FormData();
    formData.append('merk', payload.merk)
    formData.append('user_id', payload.user_id)
    formData.append('license_plate', payload.license_plate)
    formData.append('year', payload.year)
    formData.append('daily_rental_price', payload.daily_rental_price)
    formData.append('file', payload.file)
    formData.append('addres', addres)

    try {
        const response = await fetch(`${apiUrl}/car/${id}`, {
            method: 'PUT',
            body: formData,
        })
        const data = await response.json()
        return data;
    } catch (error) {
        return error;
    }
}