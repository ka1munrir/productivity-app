import {axiosInstance as api} from './axiosInstance';
import login from './sessionAPI'
import useUserStore from '../../hooks/userStore';

export async function signUp(userObj){
    return await api.post('/users', userObj);
        
    // fetch('http://172.30.135.18:5000/users', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(userObj),
    // })
    // .then(r=>r.json())
    // .then(data => console.log(data))
}

export async function getAllUsers(){
    return await api.get("/users")
}