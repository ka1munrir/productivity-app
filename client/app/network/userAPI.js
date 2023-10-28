import api from './axiosInstance';
import login from './sessionAPI'
import useUserStore from '../../hooks/userStore';

export async function signUp(userObj){
    signUpResponse = await api.post('/users', userObj);
    // login({
    //     username: signUpResponse.username,
    //     password_hash: signUpResponse.password_hash
    // })
    return signUpResponse.data
}