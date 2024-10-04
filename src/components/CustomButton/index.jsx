import {Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import React from 'react';
import {themeColors} from '../../constants/colors';
import {Fonts} from '../../constants/fonts';

const CustomButton = ({
  name,
  onPress,
  disabled,
  loginStyle,
  buttonStyle,
  image,
  imageSrc,
}) => {
  return (
    <TouchableOpacity
      style={[styles.loginButton, loginStyle]} // Spread the styles here
      onPress={onPress}
      disabled={disabled}>
      {image && <Image source={imageSrc} style={styles.imgStyle} />}
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
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 14,
    fontFamily: Fonts.SEMIBOLD,
  },
  imgStyle: {width: 20, height: 20, marginRight: 10},
});
