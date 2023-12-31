import { StyleSheet, Text, TextInput, View , KeyboardAvoidingView, Button, ScrollView, TouchableOpacity} from 'react-native';
import {colorVars} from '../../colors';
import {React, useState} from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import useUserStore from '../../hooks/userStore'
import { signUp } from '../network/userAPI';
import { logIn } from '../network/sessionAPI';
// import useSWR from 'swr';


export default function SignUp({ navigation }) {
    const { setUser } = useUserStore();
    
    return (
    <KeyboardAvoidingView behavior={'padding'} style={{ flex: 1 }}>
        <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
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
                            .min(8, 'Password should be over 7 characters long')
                            .matches(/[a-zA-Z]/, 'Password must contain at least one letter.')
                            .matches(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/, 'Password must contain at least one special character.'),
                    })}
                    onSubmit={(values) => {
                        const userObject = {
                            "first_name": values.first_name,
                            "last_name": values.last_name,
                            "email": values.email,
                            "username": values.username,
                            "password": values.password
                        };
                        const loginObj = {
                            "username": values.username,
                            "password": values.password
                        }
                        signUp(userObject)
                        .then(resp => {
                            console.log(resp);
                            logIn(loginObj)
                            .then(resp => {
                                // console.log(resp);
                                setUser(resp.data)
                                navigation.navigate('loggedinapp')
                            })
                            .catch(err => {
                                console.log(`ERROR: ${err}`)
                            });
                        })
                        .catch(err => {
                            console.log(`ERROR: ${err}`)
                        })                    
                    }}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, touched, errors, isValid }) => (
                    <View style={styles.formContainer}>
                        <View style={styles.doubledUp}>
                            <View style={styles.doubledUpInputContainers}>
                                <Text style={styles.labels}>First Name</Text>
                                <TextInput
                                    style={styles.inputs} 
                                    placeholder='First Name'
                                    value={values.first_name}
                                    onChangeText={handleChange('first_name')}
                                    onBlur={handleBlur('first_name')}
                                />
                                {touched.first_name && errors.first_name ? (<Text style={styles.errorMessage}>{errors.first_name}</Text>) : null}
                            </View>
                            <View style={styles.doubledUpInputContainers}>
                                <Text style={styles.labels}> Last Name</Text>
                                <TextInput 
                                    style={styles.inputs} 
                                    placeholder='Last Name'
                                    value={values.last_name}
                                    onChangeText={handleChange('last_name')}
                                    onBlur={handleBlur('last_name')}
                                />
                                {touched.last_name && errors.last_name ? (<Text style={styles.errorMessage}>{errors.last_name}</Text>) : null}
                            </View>
                        </View>
                        <View style={styles.inputContainers}>
                            <Text style={styles.labels}>Email</Text>
                            <TextInput 
                                style={styles.inputs} 
                                placeholder='Email'
                                value={values.email}
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                            />
                            {touched.email && errors.email ? (<Text style={styles.errorMessage}>{errors.email}</Text>) : null}
                        </View>
                        <View style={styles.inputContainers}>
                            <Text style={styles.labels}>Username</Text>
                            <TextInput 
                                style={styles.inputs} 
                                placeholder='Username'
                                value={values.username}
                                onChangeText={handleChange('username')}
                                onBlur={handleBlur('username')}
                            />
                            {touched.username && errors.username ? (<Text style={styles.errorMessage}>{errors.username}</Text>) : null}
                        </View>
                        <View style={styles.inputContainers}>
                            <Text style={styles.labels}>Password</Text>
                            <TextInput
                                style={styles.inputs}
                                placeholder='Password' 
                                secureTextEntry = {true}
                                value={values.password}
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                            />
                            {touched.password && errors.password ? (<Text style={styles.errorMessage}>{errors.password}</Text>) : null}
                        </View>
                        <TouchableOpacity style={styles.button} onPress={() => handleSubmit()}>
                            <Text style={{color: colorVars.text, fontWeight: 700}}>Sign Up</Text>
                        </TouchableOpacity>
                        <View style={{flex: 1, flexDirection: 'row', marginTop: 10}}>
                            <Text style={{color: colorVars.text}}>Already have an account? </Text>
                            <Text style={{color: '#2096f2'}} onPress={() => {navigation.navigate('login')}}>Log In</Text>
                        </View>
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
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
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
    errorMessage: {
        color: "red",
        fontSize: 10, 
    },
    button: {
        backgroundColor: '#2096f2', 
        paddingVertical: 10, 
        borderRadius: 7, 
        marginTop: 10, 
        width: '100%', 
        flex: 1, 
        justifyContent: 'center',
        alignItems: 'center',
    }
  });