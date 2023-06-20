import {createAction, createSlice} from '@reduxjs/toolkit';
import tokenAuthService from "../../utils/tokenAuthService";
import {getProfile, login } from "../thunks/authThunk";
import {ToastSuccess} from "../../components/toast-message/ToastMessage";

export const logOut = createAction('auth/logout');

const initialState = {
    userInfo: null as any
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setDataUserInfo(state, action) {
            state.userInfo = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state, action) => {
            const { statusCode, data } = action.payload;
            const accessToken = data?.token.accessToken;
            const refreshToken = data?.token.refreshToken;
            if (statusCode === 200 && accessToken) {
                state.userInfo = { ...data.user, token: accessToken };
                tokenAuthService.setLocalAccessToken(accessToken);
                tokenAuthService.setLocalRefreshToken(refreshToken);
                ToastSuccess('Login Success!')
            }
        });
        builder.addCase(getProfile.fulfilled, (state, action) => {
            const { statusCode, data } = action.payload;
            if (statusCode === 200) {
                state.userInfo = data;
            }
        });
        builder.addCase(logOut, (state, action) => {
            state.userInfo = null as any;
            tokenAuthService.removeAuthUser();
        })
    }
});

export const { setDataUserInfo } = authSlice.actions;
export default authSlice.reducer;