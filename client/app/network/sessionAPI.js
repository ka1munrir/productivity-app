import {axiosInstance as api} from './axiosInstance';

export async function checkSession() {
    r = await api.get('/checksession');
    return r.data;
}

export async function logIn(userInfo) {
    return await api.post('/login', userInfo);
}

export async function logOut() {
    r = await api.delete('/logout');
    return r.data;
}