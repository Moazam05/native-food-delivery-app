import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch} from 'react-redux';
import {selectedUser, setUser} from '../redux/auth/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {themeColors} from '../constants/colors';
import {ProfileImg} from '../assets/images';
import useTypedSelector from '../hooks/useTypedSelector';
import {Fonts} from '../constants/fonts';

const Profile = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const loginUser = useTypedSelector(selectedUser);

  console.log('loginUser', loginUser);

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
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Profile Settings</Text>

      <View style={styles.profileInfo}>
        <Image source={ProfileImg} style={styles.profileImage} />

        <Text style={styles.profileName}>{loginUser?.name}</Text>
        <Text style={styles.profileEmail}>{loginUser?.email}</Text>
      </View>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    textAlign: 'center',
    fontSize: 16,
    color: themeColors.BLACK,
    marginTop: 18,
  },
  profileInfo: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginTop: 40,
  },
  profileName: {
    fontSize: 16,
    marginTop: 16,
    color: themeColors.BLACK,
    fontFamily: Fonts.SEMIBOLD,
  },
  profileEmail: {
    fontSize: 14,
    color: themeColors.BLACK,
    fontFamily: Fonts.REGULAR,
  },
});
