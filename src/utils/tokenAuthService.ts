import { eraseCookie, getCookie, setCookie } from './shared';
import { LStorage } from './storage';

class TokenAuthService { 

    getLocalAuthUser() {
        const authUser = getCookie('auth-user');
        if (!authUser) return null
        return JSON.parse(authUser||'')
    }

    setLocalAccessToken(token:string) {
        const authUser = getCookie('auth-user');
        const authUserObj = JSON.parse(authUser || '{}');
        setCookie('auth-user', JSON.stringify({ ...authUserObj, token }));
    }

    setLocalRefreshToken(refreshToken:string) {
        const authUser = getCookie('auth-user');
        const authUserObj = JSON.parse(authUser || '{}');
        setCookie('auth-user', JSON.stringify({ ...authUserObj, refreshToken }));
    }

    setAuthUser(authUser: any) {
        setCookie('auth-user', JSON.stringify(authUser));
    }

    removeAuthUser() {
        eraseCookie('auth-user');
    }
}

export default new TokenAuthService();
