import { React } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { checkSession } from './app/network/sessionAPI';

// screen imports
import OnboardingPage from './app/screens/OnboardingPage';
import LandingPage from './app/screens/LandingPage';
import LogIn from './app/screens/LogInPage';
import SignUp from './app/screens/SignUpPage';
import LoggedInApp from './app/screens/loggedInScreens/LoggedInApp';

import useUserStore from './hooks/userStore';

export default function App() {
  const Stack = createNativeStackNavigator();
  const { user } = useUserStore();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={user ? "loggedinapp" : "landing"} screenOptions={{headerShown: false}}>
        <Stack.Screen name="onboarding" component={OnboardingPage}/>
        <Stack.Screen name="landing" component={LandingPage}/>
        <Stack.Screen name="login" component={LogIn} />
        <Stack.Screen name="signup" component={SignUp} />
        <Stack.Screen name="loggedinapp" component={LoggedInApp} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}