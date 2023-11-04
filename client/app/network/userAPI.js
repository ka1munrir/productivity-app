import {axiosInstance as api} from './axiosInstance';
import login from './sessionAPI'
import useUserStore from '../../hooks/userStore';

export async function signUp(userObj){
    return await api.post('/users', userObj);
}
export async function patchUser(userObj){
    return await api.patch(`/users/${userObj.id}`, userObj)
}

export async function deleteUser(id){
    return await api.delete("/users", id)
}
