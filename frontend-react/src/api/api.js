import axios from 'axios';

import Cookies from 'js-cookie';

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BE_URL + '/api',
    timeout: 1000, // Timeout request dalam milidetik
    withCredentials: true, // untuk mengizinkan cookies dikirim bersama permintaan
    headers: {
        'Content-Type': 'application/json',
    }
});

// Menambahkan token CSRF ke header permintaan
apiClient.interceptors.request.use(
    async (config) => {

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