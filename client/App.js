import { React } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// screen imports
import OnboardingPage from './app/screens/OnboardingPage';
import LandingPage from './app/screens/LandingPage';
import LogIn from './app/screens/LogInPage';
import SignUp from './app/screens/SignUpPage';
// import ShoppingList from './app/screens/ShoppingList';


export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="signup" screenOptions={{headerShown: false}}>
        <Stack.Screen name="onboarding" component={OnboardingPage}/>
        <Stack.Screen name="landing" component={LandingPage}/>
        <Stack.Screen name="login" component={LogIn} />
        <Stack.Screen name="signup" component={SignUp} />
        {/* <Stack.Screen name="shoppinglist" component={ShoppingList} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
