import { APIs } from '../utils/api';
import httpService from './../config/http.service';

const authUrl = process.env.REACT_APP_BASE_URL;

const authServices = {
    getProfile(payload: any) {
        return httpService(authUrl).post(APIs.GET_PROFILE, payload);
    },

    login(username: string, password: string) {
        return httpService(authUrl).post(APIs.LOGIN, {
            username,
            password
        });
    }
};

export default authServices;