import {
  View,
  Text,
  Modal,
  StyleSheet,
  Dimensions,
  Image,
  StatusBar,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {Success} from '../../../../assets/images';
import CustomButton from '../../../../components/CustomButton';
import {Fonts} from '../../../../constants/fonts';
import {themeColors} from '../../../../constants/colors';

const PasswordChangeModal = ({visible, setModalVisible}) => {
  const navigation = useNavigation();

  const homeHandler = () => {
    setModalVisible(false);
    navigation.navigate('Login');
  };

  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="rgba(0, 0, 0, 0.5)"
      />
      <View style={styles.modalView}>
        <View style={styles.mainView}>
          <View style={styles.wrap}>
            <Image source={Success} style={styles.thank} />

            <Text style={styles.payment}>Password Changed</Text>
            <Text style={styles.changeText}>
              Password changed successfully, you can login again with a new
              password
            </Text>

            <View style={styles.buttonContainer}>
              <CustomButton
                name="Login"
                loginStyle={styles.homeWrap}
                onPress={() => {
                  homeHandler();
                }}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default PasswordChangeModal;

const styles = StyleSheet.create({
  modalView: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    position: 'absolute',
    top: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainView: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 15,
    alignItems: 'center',
    elevation: 5,
  },
  wrap: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  thank: {
    width: 170,
    height: 170,
    resizeMode: 'contain',
    marginRight: 10,
  },
  payment: {
    fontSize: 24,
    fontFamily: Fonts.SEMIBOLD,
    color: '#101010',
    marginTop: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
    marginTop: 20,
    gap: 15,
  },
  homeWrap: {
    backgroundColor: themeColors.PRIMARY,
    padding: 12,
    borderRadius: 100,
    alignItems: 'center',
    marginTop: 10,
    width: '100%',
  },
  changeText: {
    fontSize: 14,
    fontFamily: Fonts.MEDIUM,
    color: themeColors.GRAY,
    textAlign: 'center',
    marginTop: 10,
  },
  trackWrap: {
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginTop: 0,
  },
  trackText: {
    fontSize: 12,
  },
});
