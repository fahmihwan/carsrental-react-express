import apiClient from "./api";


export const csrfToken = async () => {
    try {
        let csrf = await apiClient.get('/csrf-token', { withCredentials: true });
        apiClient.defaults.headers['X-CSRF-Token'] = csrf.data.csrfToken
    } catch (error) {
        return false
    }

}