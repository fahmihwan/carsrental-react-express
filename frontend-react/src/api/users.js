import apiClient from "./api";
import { csrfToken } from "./csrftoken";

export const findUserById = async (id) => {
    try {
        const response = await apiClient.get(`/user/${id}`)
        return response.data
    } catch (error) {
        return error
    }
}


export const updateUser = async (id, payload) => {
    try {
        await csrfToken()
        const response = await apiClient.put(`/user/${id}`, payload)
        return response.data
    } catch (error) {
        return error;
    }
}