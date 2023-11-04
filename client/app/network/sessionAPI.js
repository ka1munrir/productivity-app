import {axiosInstance as api} from './axiosInstance';

export async function checkSession() {
    return await api.get('/checksession');
}

export async function logIn(userInfo) {
    return await api.post('/login', userInfo);
}

export async function logOut() {
    return await api.delete('/logout');
}