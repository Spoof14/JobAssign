/**
 * Service class for authenticating users against an API
 * and storing JSON Web Tokens in the browsers LocalStorage.
 */
import jwtDecode from 'jwt-decode'
class AuthService {

    constructor() {
        this.auth_api_url = process.env.REACT_APP_API_URL
    }

    login(name, password) {
        return this.fetch(this.auth_api_url + '/corporations/authenticate', {
            method: 'POST',
            body: JSON.stringify({
                name,
                password
            })
        }).then(res => {
            this.setToken(res.token);
            return Promise.resolve(res);
        })
    }

    loggedIn() {
        let token = this.getToken();
        if (token && jwtDecode(token).exp < Date.now() / 1000) {
            this.logout();
            return false
        }
        return (token !== undefined && token !== 'undefined');
    }

    decodeToken(){
        let token = this.getToken()
        return jwtDecode(token)
    }

    setToken(token) {
        localStorage.setItem('token', token)
    }

    getToken() {
        return localStorage.getItem('token')
    }

    logout() {
        localStorage.removeItem('token');
    }

    fetch(url, options) {
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };

        if (this.loggedIn()) {
            headers['Authorization'] = 'Bearer ' + this.getToken()
        }

        return fetch(url, {
            headers,
            ...options
        })
        .then(response => response.json());
    }
}

export default AuthService;
