import axios from 'axios';

// custom axios
const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    timeout: 5000,
    withCredentials: true

});

export default axiosInstance;