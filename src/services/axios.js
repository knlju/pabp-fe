import axios from 'axios';

const axiosInstance = axios.create({
    // baseURL: 'http://localhost:43939/api',
    baseURL: 'http://localhost:5111/api',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosInstance;