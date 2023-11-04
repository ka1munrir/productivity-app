import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View , KeyboardAvoidingView, Button} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import {colorVars} from '../../colors';
import {React, useState} from 'react';
import useUserStore from '../../hooks/userStore'
import { logIn } from '../network/sessionAPI';

export default function LogIn() {
  const { setUser } = useUserStore()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')


  const handleSubmit = () => {
    const loginObj = { "username": username, "password": password }
    
    logIn(loginObj)
    .then(resp => {
      setUser(resp.data)
      // console.log(resp)
      navigation.navigate('loggedinapp')
    })
    .catch(err => {
      console.log(`ERROR: ${err}`)
    });
  };

  return (
    <KeyboardAvoidingView behavior={'padding'} style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.title}>Log In</Text>
        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.lables}>Username:</Text>
            <TextInput 
              style={styles.inputs}
              placeholder='Username'
              value={username}
              onChangeText={(value) => setUsername(value)}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.lables}>Password:</Text>
            <TextInput 
              style={styles.inputs}
              placeholder='Password'
              secureTextEntry={true}
              value={password}
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