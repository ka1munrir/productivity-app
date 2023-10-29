import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View , KeyboardAvoidingView, Button} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import {colorVars} from '../../colors';
import {React, useState} from 'react';
import useUserStore from '../../hooks/userStore'

export default function LogIn() {
  const { setUser } = useUserStore()
  const {username, setUsername} = useState('')
  const {password, setPassword} = useState('')


  const handleSubmit = (e) => {
    e.preventDefault();

    const userObject = { "username": username, "password": password }

    fetch('http://127.0.0.1:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userObject)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`${response.json()}`);
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
        setUser(data)
        // Navigate home
      })
      .catch(error => {
        console.log("error", error.message);
      })
    };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.title}>Log In</Text>
        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.lables}>Username:</Text>
            <TextInput 
              style={styles.inputs}
              onChangeText={(value) => setUsername(value)}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.lables}>Password:</Text>
            <TextInput 
              style={styles.inputs}
              placeholder='Password'
              secureTextEntry={true}
              onChangeText={(value) => setPassword(value)}
            />
          </View>
          <Button
            style={styles.button}
            title='Log In'
            onPress={() => handleSubmit()}/>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorVars.background,
    paddingTop: 75,
    paddingHorizontal: 25,
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
  inputContainer:{
    marginVertical: 10,
  },
  lables: {
    color: colorVars.text,
    fontSize: 20,
    opacity: 0.75,
    marginBottom: 10,
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