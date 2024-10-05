import {View, Text} from 'react-native';
import React, {useState} from 'react';
import CustomModal from '../../components/CustomModal';
import {themeColors} from '../../constants/colors';
import {Fonts} from '../../constants/fonts';
import CustomButton from '../../components/CustomButton';

const SignOutModal = () => {
  const [visible, setVisible] = useState(true);

  return (
    <>
      <CustomModal visible={visible}>
        <View
          style={{
            padding: 16,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: 20,
              color: themeColors.BLACK,
              fontFamily: Fonts.SEMIBOLD,
            }}>
            Sign Out
          </Text>

          <Text
            style={{
              fontSize: 14,
              color: themeColors.GRAY,
              fontFamily: Fonts.MEDIUM,
              marginTop: 16,
            }}>
            Do you want to log out?
          </Text>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 25,
              width: '100%',
              marginBottom: 8,
            }}>
            <CustomButton
              name="Cancel"
              loginStyle={{
                backgroundColor: 'transparent',
                borderWidth: 1,
                borderColor: '#E0E0E0',
                width: '47%',
                padding: 10,
              }}
              buttonStyle={{
                color: themeColors.BLACK,
              }}
            />
            <CustomButton
              name="Log Out"
              loginStyle={{
                width: '47%',
                padding: 10,
              }}
            />
          </View>
        </View>
      </CustomModal>
    </>
  );
};

export default SignOutModal;
