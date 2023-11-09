import { SafeAreaView, View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { FontAwesome5 } from '@expo/vector-icons';

import { colorVars } from '../../../colors'
import useUserStore from '../../../hooks/userStore'

export default function Profile({navigation}) {
  const { user, logOutUser } = useUserStore();
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colorVars.background, justifyContent: 'center', alignItems: 'center'}}>
      <FontAwesome5 name="user-circle" size={100} color="white" />
      <Text style={{fontSize: 40, color: colorVars.text}}>Profile</Text>
      <TouchableOpacity style={{backgroundColor: colorVars.accent, paddingHorizontal: 20, paddingVertical: 10, borderRadius: 5}} onPress={() => {
        logOutUser();
        navigation.navigate("landing");
      }}>
        <Text style={{color: colorVars.text}}>Log Out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}