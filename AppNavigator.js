import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import Onboarding from './src/screens/Onboarding';
import Login from './src/screens/Authentication/Login';
import SignUp from './src/screens/Authentication/SignUp';
import ForgotPassword from './src/screens/Authentication/ForgotPassword';
import EmailVerification from './src/screens/Authentication/ForgotPassword/components/EmailVerification';
import ResetPassword from './src/screens/Authentication/ForgotPassword/components/ResetPassword';
import {useDispatch} from 'react-redux';
import {selectedUser, setUser} from './src/redux/auth/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Image, StatusBar, StyleSheet, View} from 'react-native';
import {Onboarding2} from './src/assets/images';
import useTypedSelector from './src/hooks/useTypedSelector';
import HomeScreen from './src/screens/Home/HomeScreen';
import ProductDetail from './src/screens/Products/ProductDetail';
import ProfileDetail from './src/screens/Account/ProfileDetail';
import Favorites from './src/screens/Favorites';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const dispatch = useDispatch();
  const loginUser = useTypedSelector(selectedUser);

  const [isLoading, setIsLoading] = useState(true);
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false);

  useEffect(() => {
    const loadUser = async () => {
      try {
        setIsLoading(true);
        const user = await AsyncStorage.getItem('user');
        const onboardingStatus = await AsyncStorage.getItem(
          'hasSeenOnboarding',
        );

        if (onboardingStatus) {
          setHasSeenOnboarding(true);
        }

        if (user) {
          dispatch(setUser(JSON.parse(user)));
        }
      } catch (error) {
        console.error('Error retrieving data from AsyncStorage:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadUser();
  }, [dispatch]);

  if (isLoading) {
    return (
      <View>
        <StatusBar
          barStyle="light-content"
          translucent
          backgroundColor="transparent"
        />
        <Image source={Onboarding2} style={styles.loaderImg} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {loginUser ? (
          <>
            {/* If user is logged in, show Home and other screens */}
            <Stack.Screen
              name="HomeScreen"
              component={HomeScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="ProductDetail"
              component={ProductDetail}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="ProfileDetail"
              component={ProfileDetail}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Favorites"
              component={Favorites}
              options={{
                headerShown: false,
              }}
            />
          </>
        ) : (
          <>
            {!hasSeenOnboarding ? (
              // Show onboarding only if the user hasn't seen it
              <Stack.Screen
                name="Onboarding"
                component={Onboarding}
                options={{
                  headerShown: false,
                }}
              />
            ) : (
              <>
                {/* If user has seen onboarding, show login-related screens */}
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
              </>
            )}
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

const styles = StyleSheet.create({
  loaderImg: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});
