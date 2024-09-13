import axios from 'axios';

import Cookies from 'js-cookie';

const apiClient = axios.create({
    baseURL: 'http://localhost:3000/api',
    timeout: 1000, // Timeout request dalam milidetik
    headers: {
        'Content-Type': 'application/json',
    }
});

apiClient.interceptors.request.use(
    (config) => {

        const token = Cookies.get('token')
        if (token) {
            config.headers['Authorization'] = `Bearer ${JSON.parse(token)}`;  // Tambahkan token ke header jika ada
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

apiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default apiClient