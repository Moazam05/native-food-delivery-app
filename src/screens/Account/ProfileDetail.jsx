import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';
import React, {useState} from 'react';
import {Back, ProfileImg} from '../../assets/images';
import {useNavigation} from '@react-navigation/native';
import {Fonts} from '../../constants/fonts';
import {themeColors} from '../../constants/colors';
import {SafeAreaView} from 'react-native-safe-area-context';
import useTypedSelector from '../../hooks/useTypedSelector';
import {selectedUser, setUser} from '../../redux/auth/authSlice';
import TextField from '../../components/TextField';
import CustomButton from '../../components/CustomButton';
import {useDispatch} from 'react-redux';
import {updateUser} from '../../redux/users/userSlice';
import Toast from 'react-native-toast-message';

const ProfileDetail = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const loginUser = useTypedSelector(selectedUser);

  const [phone, setPhone] = useState('');

  const handleSave = () => {
    const updated = {
      ...loginUser,
      phone,
    };

    dispatch(updateUser(updated));
    dispatch(setUser(updated));
    navigation.goBack();
    Toast.show({
      type: 'success',
      text1: 'Profile Updated',
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor="transparent"
      />
      <View style={styles.wrap}>
        {/* Top Bar */}
        <View style={styles.topBar}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            <Image source={Back} style={styles.backIcon} />
          </TouchableOpacity>
          <Text style={styles.title}>Personal Data</Text>
          <Text style={styles.h}>Hide</Text>
        </View>

        <View style={styles.profileInfo}>
          <Image source={ProfileImg} style={styles.profileImage} />
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Full Name</Text>

          <TextField
            placeholder="Full Name"
            value={loginUser?.name}
            inputWrap={{
              height: 52,
            }}
            editable={false}
          />
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Email Address</Text>

          <TextField
            placeholder="Email Address"
            value={loginUser?.email}
            inputWrap={{
              height: 52,
            }}
            editable={false}
          />
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Phone Number</Text>

          <TextField
            inputWrap={{
              height: 52,
            }}
            keyboardType="phone-pad"
            value={loginUser?.phone || phone}
            onChangeText={setPhone}
            placeholder="Phone Number"
          />
        </View>

        <View style={styles.buttonWrap}>
          <CustomButton name="Save" onPress={handleSave} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProfileDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeColors.PRIMARY_BG,
  },
  wrap: {
    marginHorizontal: 20,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  backIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 16,
    fontFamily: Fonts.SEMIBOLD,
    color: themeColors.BLACK,
  },
  h: {
    opacity: 0,
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

  fieldContainer: {
    marginBottom: 15,
  },

  label: {
    fontSize: 14,
    fontFamily: Fonts.MEDIUM,
    color: themeColors.BLACK,
    marginBottom: 8,
  },
  buttonWrap: {
    marginTop: 40,
  },
});
