import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

import { Store } from '@reduxjs/toolkit';
import { get } from 'lodash';
import {APIs} from "../utils/api";
import tokenAuthService from "../utils/tokenAuthService";
import {logOut} from "../redux/reducers/auth.reducer";

// inject store to uncomponent file
let store: Store;
export const injectStore = (_store: Store) => {
    store = _store;
};

function baseService(baseUrl = process.env.REACT_APP_BASE_URL) {
    const axiosInstance = axios.create({
        baseURL: baseUrl,
        withCredentials: false,
        timeout: 1000000,
        headers: {
            'Content-Type': 'application/json',
            // 'Device-Id': deviceId
        },
    });

    axiosInstance.interceptors.request.use(
        (config: any) => {
            const authUser = tokenAuthService.getLocalAuthUser() || {};
            const token = get(authUser, 'token', '');
            if (token && config) {
                if (!config.headers) {
                    config.headers = {};
                }
                config.headers.authorization = 'Bearer ' + token; // for Spring Boot back-end
            }
            return config;
        },
        (error: AxiosError): Promise<AxiosError> => {
            return Promise.reject(error);
        }
    );

    axiosInstance.interceptors.response.use(
        (res: AxiosResponse): AxiosResponse => {
            if (res.data.code === 401) {
                store.dispatch(logOut());
            }
            return res;
        },
        async (err) => {
            const originalConfig = err.config;
            const authObj = tokenAuthService.getLocalAuthUser() || {};
            const refreshToken = get(authObj, 'refreshToken', '');
            if (
                ![ APIs.LOGIN ].includes(originalConfig.url) &&
        err.response
            ) {
                // Access Token was expired
                if (err.response.status === 401 && !originalConfig._retry) {
                    originalConfig._retry = true;

                    try {
                        const rs = await axios.post(
                            process.env.REACT_APP_AUTHENTICATION_BASE_URL + APIs.REFRESH_TOKEN,
                            { refreshToken: refreshToken }

                        );
                        if (rs){
                            const newAccessToken = rs.data?.data?.accessToken;
                            const newRefreshToken = rs.data?.data?.refreshToken;
                            tokenAuthService.setLocalAccessToken(newAccessToken);
                            tokenAuthService.setLocalRefreshToken(newRefreshToken);
                        }

                        return axiosInstance(originalConfig);
                    } catch (_error) {
                        // Logging out the user by removing all the tokens from local
                        tokenAuthService.removeAuthUser();
                        window.location.href = window.location.origin;
                        return Promise.reject(_error);
                    }
                }
            }
            return Promise.reject(err);
        }
    );

    return axiosInstance;
}

export default baseService;
