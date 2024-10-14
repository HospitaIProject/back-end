import axios, { AxiosError } from 'axios';
import Cookies from 'js-cookie';
import { ErrorResponse } from 'react-router-dom';

const BASE_URL = import.meta.env.VITE_API_URL;

const Axios = axios.create({
    baseURL: BASE_URL,
});
Axios.interceptors.request.use(
    async (config) => {
        const token = Cookies.get('jwtToken');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error: AxiosError<ErrorResponse>) => {
        if (error.response?.status === 401) {
            Cookies.remove('jwtToken');
            alert('세션이 만료되어 로그인 페이지로 이동합니다.');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    },
);
Axios.interceptors.response.use((response) => {
    return response;
});

export default Axios;
