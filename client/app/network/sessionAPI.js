import {axiosInstance as api} from './axiosInstance';
import useUserStore from '../../hooks/userStore'

export async function checkSessions() {
    r = await api.get('/checksession');
    return r.data;
}

export async function login(userInfo) {
    r = await api.post('/login', userInfo);
    return r.data;
}

export async function logout() {
    r = await api.delete('/logout');
    return r.data;
}