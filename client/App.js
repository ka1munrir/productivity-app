import { React } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// screen imports
import LogIn from './app/screens/LogInPage';
import OnboardingPage from './app/screens/OnboardingPage';
import LandingPage from './app/screens/LandingPage';


export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="onboarding" screenOptions={{headerShown: false}}>
        <Stack.Screen name="onboarding" component={OnboardingPage}/>
        <Stack.Screen name="landing" component={LandingPage}/>
        <Stack.Screen name="login" component={LogIn} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
