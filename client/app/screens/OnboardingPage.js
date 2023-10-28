import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import Onboarding from 'react-native-onboarding-swiper';
import { colorVars } from '../../colors';

export default function OnboardingPage({ navigation }) {
  return (
    <View style={styles.container}>
      <Onboarding
      onSkip={() => {navigation.navigate('landing')}}
      onDone={() => {navigation.navigate('landing')}}
        pages={[
          {
            backgroundColor: colorVars.background,
            image: <Image style={styles.swiperImage} source={require('../assets/dannymcgrath.png')} />,
            title: (<Text style={styles.title}>Events</Text>),
            subtitle: (<Text style={styles.subtitle}>Add and keep track of all your events.</Text>),
          },
          {
            backgroundColor: colorVars.background,
            image: <Image style={styles.swiperImage} source={require('../assets/dannymcgrath.png')} />,
            title: (<Text style={styles.title}>Tasks and Task Lists</Text>),
            subtitle: (<Text style={styles.subtitle}>Add and create new tasks and task lists.</Text>),
          },
          {
            backgroundColor: colorVars.background,
            image: <Image style={styles.swiperImage} source={require('../assets/dannymcgrath.png')} />,
            title: (<Text style={styles.title}>Shopping List</Text>),
            subtitle: (<Text style={styles.subtitle}>Add items to your shopping list.</Text>),
          },
          {
            backgroundColor: colorVars.background,
            image: <Image style={styles.swiperImage} source={require('../assets/dannymcgrath.png')} />,
            title: (<Text style={styles.title}>Methods</Text>),
            subtitle: (<Text style={styles.subtitle}>Different productivity methods, like pomodoro, with explanations and timers.</Text>),
          },
        ]}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      position: "relative",
      // marginTop: 48,
      color: colorVars.background
  },
  swiperImage: {
      resizeMode: "contain",
      height: 600,
      width: '90%',
      bottom: -400,
      position: "absolute",
  },
  title: {
      marginTop: 325,
      marginBottom: 12,
      paddingHorizontal: 35,
      fontSize: 35,
      color: colorVars.text,
      textAlign: 'center'
  },
  subtitle: {
    paddingHorizontal: 35,
    fontSize: 15,
    color: colorVars.text,
    textAlign: 'center'
  }
});