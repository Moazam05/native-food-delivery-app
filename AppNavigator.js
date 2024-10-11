import {useNavigationState} from '@react-navigation/native';
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
import {
  Alert,
  BackHandler,
  Image,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import {Onboarding2} from './src/assets/images';
import useTypedSelector from './src/hooks/useTypedSelector';
import HomeScreen from './src/screens/Home/HomeScreen';
import ProductDetail from './src/screens/Products/ProductDetail';
import ProfileDetail from './src/screens/Account/ProfileDetail';
import Favorites from './src/screens/Favorites';
import OrderTracking from './src/screens/Order/OrderTracking';
import {setAddress} from './src/redux/address/addressSlice';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const dispatch = useDispatch();
  const loginUser = useTypedSelector(selectedUser);

  const [isLoading, setIsLoading] = useState(true);
  const currentRouteIndex = useNavigationState(state => state?.index); // Get current screen index

  useEffect(() => {
    const loadUser = async () => {
      try {
        setIsLoading(true);
        const user = await AsyncStorage.getItem('user');
        if (user) {
          dispatch(setUser(JSON.parse(user)));
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error retrieving user from AsyncStorage:', error);
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    };
    loadUser();
  }, [dispatch]);

  useEffect(() => {
    const handleBackButtonClick = () => {
      if (currentRouteIndex === 0) {
        // If on the first screen (root screen)
        Alert.alert(
          'Exit App',
          'Are you sure you want to exit?',
          [
            {text: 'Cancel', onPress: () => null, style: 'cancel'},
            {
              text: 'Yes',
              onPress: () => {
                AsyncStorage.removeItem('userLocation');
                dispatch(setAddress(''));
                BackHandler.exitApp();
              },
            },
          ],
          {cancelable: false},
        );
        return true;
      }
      return false; // Allow normal back navigation for other screens
    };

    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);

    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
    };
  }, [currentRouteIndex]);

  // Show loading screen while checking AsyncStorage
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
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {loginUser ? (
        <>
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="ProductDetail" component={ProductDetail} />
          <Stack.Screen name="ProfileDetail" component={ProfileDetail} />
          <Stack.Screen name="Favorites" component={Favorites} />
          <Stack.Screen name="OrderTracking" component={OrderTracking} />
        </>
      ) : (
        <>
          <Stack.Screen name="Onboarding" component={Onboarding} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
          <Stack.Screen
            name="EmailVerification"
            component={EmailVerification}
          />
          <Stack.Screen name="ResetPassword" component={ResetPassword} />
        </>
      )}
    </Stack.Navigator>
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
