import { StyleSheet, View, Text, Button } from 'react-native'
import React from 'react'
import { colorVars } from '../../colors'

export default function LandingPage({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Productivity App</Text>
      <Button style={styles.signUpButton} title='Sign Up' onPress={() => {navigation.navigate('login')}}/>
      <Button style={styles.loginButton} title='Log In' onPress={() => {navigation.navigate('login')}}/>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: colorVars.background,
        paddingTop: 275,
    },
    title:{
        color: colorVars.text,
        fontSize: 50,
        textAlign: 'center',
        paddingHorizontal: 45,
        marginBottom: 50,
    },
    loginButton:{

    },
    signUpButton:{

    },
})