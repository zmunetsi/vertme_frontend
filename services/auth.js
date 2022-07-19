import axiosInstance from '../lib/axios'

class AuthService {

    getCsfrToken() {
        return axiosInstance.get('/sanctum/csrf-cookie');
    }

    login(email, password) {
        // get csrf token
        return this.getCsfrToken().then(response => {
            // send login request
            return axiosInstance.post('/api/login', {
                email,
                password
            }).then(response => {
                document.cookie = `token=${response.data.token}`;
                return response.data;
            }).catch(error => {
                if (error.response) {
                    console.log(error.response.data);
                } else if (error.request) {
                    console.log(error.request);
                } else {
                    console.log('Error', error.message);
                }
            });
        }).catch(error => {
            if (error.response) {
                console.log(error.response.data);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log('Error', error.message);
            }
        });

    }

    register(name, email, password, c_password) {
        // get csrf token
        return this.getCsfrToken().then(response => {
            // send register request
            return axiosInstance.post('/api/register', {
                name,
                email,
                password,
                c_password
            });
        });
    }

    logout() {
        return axiosInstance.post('/api/logout')
            .then(response => {
                document.cookie = `token=`;
                document.cookie = `user=`;
                document.cookie = `authenticated=false`;
                return response.data;
            }
            ).catch(error => {
                if (error.response) {
                    console.log(error.response.data);
                } else if (error.request) {
                    console.log(error.request);
                } else {
                    console.log('Error', error.message);
                }
            });

    }

    getCurrentUser() {
        return axiosInstance.get('/api/user').then(response => {
            return response.data;
        });
    }

}

export default AuthService;




