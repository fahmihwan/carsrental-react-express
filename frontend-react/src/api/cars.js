import apiClient from "./api"


export const getCars = async () => {
    try {
        const response = await apiClient.get("/cars")
        return response.data
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
    formData.append('address', payload.address)

    try {
        const response = await apiClient.post('/car', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
        return response.data
    } catch (error) {
        return error;
    }

}

export const findCarByUserId = async (id) => {
    try {
        const response = await apiClient.get(`/car/user/${id}`)
        return response.data
    } catch (error) {
        return error;
    }
}

export const findCarById = async (id) => {
    try {
        const response = await apiClient.get(`/car/${id}`)
        return response.data
    } catch (error) {
        return error
    }
}


export const deleteCarById = async (id) => {
    try {
        const response = await apiClient.delete(`/car/${id}`)
        return response.data
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
    if (payload.file) {
        formData.append('file', payload.file)
    }
    formData.append('address', payload.address)

    try {
        const response = await apiClient.put(`/car/${id}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
        return response.data
    } catch (error) {
        return error;
    }
}