import {axiosInstance as api} from './axiosInstance';

export async function checkSession() {
    r = await api.get('/checksession');
    return r.data;
}

export async function logIn(userInfo) {
    const user = await api.post('/login', userInfo);
    return user.data
    // return await fetch('http://172.30.135.18:5000/login', {
    //                 method: 'POST',
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                 },
    //                 body: JSON.stringify(userInfo),
    //             }).then(r => r.json());
}

export async function logOut() {
    r = await api.delete('/logout');
    return r.data;
}