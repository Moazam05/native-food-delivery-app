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
      <Text
        style={{
          textAlign: 'center',
          fontSize: 16,
          color: themeColors.BLACK,
          marginTop: 18,
        }}>
        Profile Settings
      </Text>

      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          source={ProfileImg}
          style={{
            width: 100,
            height: 100,
            alignSelf: 'center',
            marginTop: 40,
          }}
        />

        <Text
          style={{
            fontSize: 16,
            marginTop: 16,
            color: themeColors.BLACK,
            fontFamily: Fonts.SEMIBOLD,
          }}>
          {loginUser?.name}
        </Text>
        <Text
          style={{
            fontSize: 14,
            color: themeColors.BLACK,
            fontFamily: Fonts.REGULAR,
          }}>
          {loginUser?.email}
        </Text>
      </View>

      <View>
        <View>
          <Image />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
