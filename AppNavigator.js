import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Onboarding from './src/screens/Onboarding';
import Login from './src/screens/Authentication/Login';
import SignUp from './src/screens/Authentication/SignUp';
import ForgotPassword from './src/screens/Authentication/ForgotPassword';
import EmailVerification from './src/screens/Authentication/ForgotPassword/components/EmailVerification';
import ResetPassword from './src/screens/Authentication/ForgotPassword/components/ResetPassword';
import Home from './src/screens/Home';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen
          name="Onboarding"
          component={Onboarding}
          options={{
            headerShown: false,
          }}
        /> */}
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPassword}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="EmailVerification"
          component={EmailVerification}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ResetPassword"
          component={ResetPassword}
          options={{
            headerShown: false,
          }}
        />
        {/* Protected */}
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
