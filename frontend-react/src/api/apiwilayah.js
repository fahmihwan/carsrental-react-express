import apiClient from "./api";

export const getProvince = async () => {
    try {
        const response = await apiClient.get('/api-wilayah/province')
        return response.data
    } catch (error) {
        return error
    }
}

export const getRegency = async (provinceid) => {
    try {
        const response = await apiClient.get(`/api-wilayah/regency/${provinceid}`)
        return response.data
    } catch (error) {
        return error;
    }
}