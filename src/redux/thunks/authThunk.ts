import authService from './../../services/authService';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const AUTH_ACTIONS = {
    GET_PROFILE:'auth/me',
    LOGIN:'auth/login',
}

export const getProfile = createAsyncThunk(
    AUTH_ACTIONS.GET_PROFILE,
    async (payload: {token: string},{ rejectWithValue }) => {
        try {
            const response = await authService.getProfile(payload);
            return response.data;
        } catch (error:any) {
            if (!error.response) {
                throw error
            }
            return rejectWithValue(error.response.data)
        }
       
    }
);

export const login = createAsyncThunk(
    AUTH_ACTIONS.LOGIN,
    async (userLogin: { username: string; password: string },{ rejectWithValue }) => {
        try {
            const response = await authService.login(userLogin.username, userLogin.password);
            return response.data;
        } catch (error:any) {
            if (!error.response) {
                throw error
            }
            return rejectWithValue(error.response.data)
        }
       
    },

);

