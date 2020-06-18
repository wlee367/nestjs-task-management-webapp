import HttpService from '../httpService';
import { post } from 'axios';
import qs from 'querystring'

const config = {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
    }
}

class AuthenticationService extends HttpService { 

    async signin(username, password) {
        return post(`${this.BASE_URL}/auth/signin`, qs.stringify({
            username,
            password,
        }), config).then((response)=> {
            const accessToken = response.data.accessToken;
            this.saveToken(accessToken);
            if(response.status === 201) {
                return {
                    isAuthError: false,
                    errorObject: {}
                }
            }
        }).catch(err => {
            console.log(err.response)
            return {
                isAuthError: true,
                errorObject: err.response
            }
        })
    }

    async signup(username, password) {
        return post(`${this.BASE_URL}/auth/signup`, qs.stringify({ username, password }), config).then((response) => {
            if(response.status === 201) {
                return {
                    didRegisterError: false,
                    errorObject: {}
                }
            }
        }).catch(err => {
            return {
                didRegisterError: true,
                errorObject: err.response
            }
        });
    }

    async signout() {
        this.removeToken();
    }
}

export default AuthenticationService;
