import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import CustomModal from '../../components/CustomModal';
import {themeColors} from '../../constants/colors';
import {Fonts} from '../../constants/fonts';
import CustomButton from '../../components/CustomButton';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {setUser} from '../../redux/auth/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignOutModal = ({visible, setVisible}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleLogout = async () => {
    setVisible(false);
    dispatch(setUser(null));
    await AsyncStorage.removeItem('user');
    navigation.reset({
      index: 0,
      routes: [{name: 'Login'}],
    });
  };
  return (
    <>
      <CustomModal visible={visible}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Sign Out</Text>

          <Text style={styles.description}>Do you want to log out?</Text>

          <View style={styles.buttonContainer}>
            <CustomButton
              name="Cancel"
              loginStyle={styles.cancelButton}
              buttonStyle={styles.cancelButtonText}
              onPress={() => setVisible(false)}
            />
            <CustomButton
              name="Log Out"
              loginStyle={styles.logOutButton}
              onPress={handleLogout}
            />
          </View>
        </View>
      </CustomModal>
    </>
  );
};

export default SignOutModal;

const styles = StyleSheet.create({
  modalContent: {
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    color: themeColors.BLACK,
    fontFamily: Fonts.SEMIBOLD,
  },
  description: {
    fontSize: 14,
    color: themeColors.GRAY,
    fontFamily: Fonts.MEDIUM,
    marginTop: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 25,
    width: '100%',
    marginBottom: 8,
  },
  cancelButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    width: '47%',
    padding: 10,
  },
  cancelButtonText: {
    color: themeColors.BLACK,
  },
  logOutButton: {
    width: '47%',
    padding: 10,
  },
});
