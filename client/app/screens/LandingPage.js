import { 
  StyleSheet, 
  View, 
  Text,
  TouchableOpacity,
  TouchableHighlight
 } from 'react-native'
import React from 'react'
import { colorVars } from '../../colors'

export default function LandingPage({ navigation }) {

  return (
    <View style={styles.container}>
      <View style={styles.titleCont}>
        <Text style={styles.title}>To-Do App</Text>
      </View>
      <TouchableOpacity style={[styles.button, styles.signUpButton]} onPress={() => {navigation.navigate('signup')}}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, styles.loginButton]} onPress={() => {navigation.navigate('login')}}>
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: colorVars.background,
    },
    titleCont:{
      flex: 6,
      justifyContent: 'center',
      alignItems: 'center',
    },
    title:{
        color: colorVars.text,
        fontSize: 50,
        textAlign: 'center',
        paddingHorizontal: 45,
        marginBottom: 50,
    },
    button:{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    signUpButton:{
      backgroundColor: colorVars.primary,
    },
    loginButton:{
      backgroundColor: colorVars.secondary,
    },
    buttonText:{
      color: colorVars.text,
      fontSize: 20,
    }
})