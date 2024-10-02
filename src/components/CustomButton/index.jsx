import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import {themeColors} from '../../constants/colors';
import {Fonts} from '../../constants/fonts';

const CustomButton = ({name, onPress, disabled, loginStyle, buttonStyle}) => {
  return (
    <TouchableOpacity
      style={[styles.loginButton, loginStyle]} // Spread the styles here
      onPress={onPress}
      disabled={disabled}>
      <Text style={[styles.buttonText, buttonStyle]}>{name}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  loginButton: {
    backgroundColor: themeColors.PRIMARY,
    padding: 12,
    borderRadius: 100,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 14,
    fontFamily: Fonts.SEMIBOLD,
  },
});
