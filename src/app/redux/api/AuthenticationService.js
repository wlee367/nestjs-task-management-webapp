import HttpService from '../httpService';
import { post } from 'axios';

class AuthenticationService extends HttpService {
    async signin(username, password) {
        const result = await post(`${this.BASE_URL}/auth/signin`, {
            username,
            password,
        });
        const accessToken = result.data.accessToken;
        this.saveToken(accessToken);
        return result.data.username;
    }

    async signup(username, password) {
        await post(`${this.BASE_URL}/auth/signup`, { username, password });
    }

    async signout() {
        this.removeToken();
    }
}

export default AuthenticationService;
