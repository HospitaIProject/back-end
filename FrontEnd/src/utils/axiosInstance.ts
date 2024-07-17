import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;

const Axios = axios.create({
    baseURL: BASE_URL,
});
Axios.interceptors.request
    .use
    // async (config) => {
    //     const session = await getSession();
    //     const token = session?.user?.access_Token; // 세션에서 액세스 토큰 가져오기
    //     if (token) {
    //         config.headers['Authorization'] = `Bearer ${token}`;
    //     }
    //     return config;
    // },
    // (error) => {
    //     return Promise.reject(error);
    // },
    ();
Axios.interceptors.response.use(
    (response) => {
        return response;
    },
    // (error) => {
    //     if (error.message === 'Network Error') {
    //         redirect('/error');
    //     }
    //     return Promise.reject(error);
    // },
);

export default Axios;
