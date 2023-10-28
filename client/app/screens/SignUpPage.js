import { StyleSheet, Text, TextInput, View , KeyboardAvoidingView, Button} from 'react-native';
import {colorVars} from '../../colors';
import {React, useState} from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import useUserStore from '../../hooks/userStore'

export default function SignUp() {
  const formik = useFormik({
    initialValues: {
        first_name: '',
        last_name: '',
        email: '',
        username: '',
        password: ''
    },
    validationSchema: Yup.object({
        first_name: Yup.string().required('Required'),
        last_name: Yup.string().required('Required'),
        email: Yup.string().required('Required').email('Invalid email address'),
        username: Yup.string().required('Required'),
        password: Yup.string().required('Required')
            .min(8, 'Username should be over 7 characters long')
            .matches(/[a-zA-Z]/, 'Password must contain at least one letter.')
            .matches(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/, 'Password must contain at least one special character.'),
    }),
    onSubmit: values => {
        // console.log('Form data', values);

        const userObject = {
            "first_name": values.first_name,
            "last_name": values.last_name,
            "email": values.email,
            "username": values.username,
            "password": values.password
        }
        console.log(userObject);

        fetch('http://127.0.0.1:5000/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userObject)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response error");
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.log("error", error.message);
        });

    },
});
  return (
    <View>
      <Text>SignInPage</Text>
    </View>
  )
}