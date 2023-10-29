import { StyleSheet, Text, TextInput, View , KeyboardAvoidingView, Button, ScrollView} from 'react-native';
import {colorVars} from '../../colors';
import {React, useState} from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import useUserStore from '../../hooks/userStore'
import { signUp } from '../network/userAPI';

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
        signUp(userObject)
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
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView style={{flex: 1}}>
            <View style={styles.container}>
                <Text style={styles.title}>Sign Up</Text>
                <Formik
                    initialValues={{
                        first_name: '',
                        last_name: '',
                        email: '',
                        username: '',
                        password: ''
                    }}
                    validationSchema={Yup.object({
                        first_name: Yup.string().required('Required'),
                        last_name: Yup.string().required('Required'),
                        email: Yup.string().required('Required').email('Invalid email address'),
                        username: Yup.string().required('Required'),
                        password: Yup.string().required('Required')
                            .min(8, 'Username should be over 7 characters long')
                            .matches(/[a-zA-Z]/, 'Password must contain at least one letter.')
                            .matches(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/, 'Password must contain at least one special character.'),
                    })}
                    onSubmit={values => {
                        // console.log('Form data', values);
                
                        const userObject = {
                            "first_name": values.first_name,
                            "last_name": values.last_name,
                            "email": values.email,
                            "username": values.username,
                            "password": values.password
                        }
                        console.log(userObject);
                        signUp(userObject)
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
                    }}
                >
                    {({ handleChange, handleBlur, handleSubmit, values }) => (
                    <View style={styles.formContainer}>
                        <View style={styles.doubledUp}>
                            <View style={styles.doubledUpInputContainers}>
                                <Text style={styles.labels}>First Name</Text>
                                <TextInput
                                    style={styles.inputs} 
                                    placeholder='First Name'
                                    value={values.first_name}
                                    onChangeText={handleChange('first_name')}
                                    onBlur={handleBlur('email')}
                                />
                                {touched.first_name && errors.first_name ? (<Text className="error">{errors.first_name}</Text>) : null}
                            </View>
                            <View style={styles.doubledUpInputContainers}>
                                <Text style={styles.labels}> Last Name</Text>
                                <TextInput 
                                    style={styles.inputs} 
                                    placeholder='Last Name'
                                    value={values.last_name}
                                    onChangeText={handleChange('last_name')}
                                />
                                {touched.last_name && errors.last_name ? (<Text className="error">{errors.last_name}</Text>) : null}
                            </View>
                        </View>
                        <View style={styles.inputContainers}>
                            <Text style={styles.labels}>Email</Text>
                            <TextInput 
                                style={styles.inputs} 
                                placeholder='Email'
                                value={values.email}
                                onChangeText={handleChange('email')}
                            />
                            {touched.email && errors.email ? (<Text className="error">{errors.email}</Text>) : null}
                        </View>
                        <View style={styles.inputContainers}>
                            <Text style={styles.labels}>Username</Text>
                            <TextInput 
                                style={styles.inputs} 
                                placeholder='Username'
                                value={values.username}
                                onChangeText={handleChange('username')}
                            />
                            {touched.username && errors.username ? (<Text className="error">{errors.username}</Text>) : null}
                        </View>
                        <View style={styles.inputContainers}>
                            <Text style={styles.labels}>Password</Text>
                            <TextInput
                                style={styles.inputs}
                                placeholder='Password' 
                                secureTextEntry = {true}
                                value={values.password}
                                onChangeText={handleChange('password')}
                            />
                            {touched.password && errors.password ? (<Text className="error">{errors.password}</Text>) : null}
                        </View>
                        <Button
                        style={styles.button}
                        title='Sign Up'
                        onPress={() => handleSubmit()}/>
                    </View>
                    )}
                </Formik>
            </View>
        </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colorVars.background,
      paddingTop: 75,
      paddingHorizontal: 20,
      alignItems: 'center',
      justifyContent: 'space-evenly',
    },
    title: {
      color: colorVars.text,
      fontSize: 65,
      marginTop: 50,
    },
    formContainer: {
      width: '100%',
      marginBottom: 150,
      padding: 50,
    },
    doubledUp: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    doubledUpInputContainers: {
        marginVertical: 10,
        width: '49%',
    },
    inputContainer:{
      marginVertical: 10,
    },
    labels: {
      color: colorVars.text,
      fontSize: 20,
      opacity: 0.75,
      marginVertical: 10,
    },
    inputs: {
      color: colorVars.text,
      width: '100%',
      fontSize: 20,
      borderWidth: 1,
      borderColor: colorVars.backgroundTrinary,
      borderRadius: 2,
      padding: 10,
    },
    button: {
      backgroundColor: colorVars.primary,
      color: colorVars.secondary,
      borderWidth: 1,
    }
  });