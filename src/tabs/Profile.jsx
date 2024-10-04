import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Alert, Text, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch} from 'react-redux';
import {setUser} from '../redux/auth/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleLogout = () => {
    Alert.alert(
      'Confirm Logout',
      'Are you sure you want to log out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          onPress: () => {
            dispatch(setUser(null));
            AsyncStorage.removeItem('user');
            navigation.navigate('Login');
          },
        },
      ],
      {cancelable: false},
    );
  };
  return (
    <SafeAreaView>
      <Text
        style={{
          margin: 20,
        }}>
        Profile
      </Text>
      <TouchableOpacity
        onPress={() => {
          handleLogout();
        }}
        style={{
          margin: 20,
        }}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Profile;
