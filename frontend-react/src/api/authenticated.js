
import apiClient from "./api";
import Cookies from 'js-cookie';
import { csrfToken } from "./csrftoken";

export const authenticated = async (formData) => {

    try {

        await csrfToken()
        const response = await apiClient.post(`/login`, formData)

        if (response.status === 400 || response.status === 500) {
            return ["Email or password is not valid.", false];
        }

        Cookies.set("user_id", response.data.data.user.id);
        Cookies.set("token", JSON.stringify(response.data.data.token));
        return [response.data.message, true, response.data.data.user];

    } catch (error) {
        return false;
    }
};

export const registrasiUser = async (formData) => {

    try {
        await csrfToken()
        const response = await apiClient.post(`/registrasi`, formData)

        return response.data
    } catch (error) {
        return false;
    }


}

// export default authenticated;
