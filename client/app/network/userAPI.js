import {axiosInstance as api} from './axiosInstance';
import login from './sessionAPI'
import useUserStore from '../../hooks/userStore';

export async function signUp(userObj){
    // signUpResponse = await api.post('/users', userObj);
    // login({
    //     username: signUpResponse.username,
    //     password_hash: signUpResponse.password_hash
    // })
    // let signUpResponse
    // fetch("http://127.0.0.1:5000/users", {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(userObj)})
    // .then(response => response.json())
    // .then(data => signUpResponse = data)
    // return signUpResponse
    try {
        const response = await fetch('https://172.30.135.18:5000/users/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userObj),
        });

        if (!response.ok) {
            const errorResponse = await response.json(); // Get error details if available
            throw new Error(`Network response was not ok: ${response.status} - ${errorResponse}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error in signUp:', error);
        throw error;
    }
}
    