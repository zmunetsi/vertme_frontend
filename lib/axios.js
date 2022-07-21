import axios from 'axios';
let token = ""

if (typeof document !== 'undefined') {
    // get cookie token
    const cookies = document.cookie.split(';');
    cookies.forEach(cookie => {
        if (cookie.indexOf('token') > -1) {
            token = cookie.split('=')[1]
        }
    });
}

const axiosInstance = axios.create({
    baseURL: 'https://vertme.peoplecreate.co.za',
   // baseURL: 'http://127.0.0.1:8000',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'Authorization': `Bearer ${token}`,
        
    },
    timeout: 5000,
    withCredentials: true

});

export default axiosInstance;