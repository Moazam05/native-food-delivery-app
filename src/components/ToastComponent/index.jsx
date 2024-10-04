import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Toast from 'react-native-toast-message';
import {themeColors} from '../../constants/colors';

const toastConfig = {
  success: ({text1}) => (
    <View style={styles.toast}>
      <Text style={styles.toastText}>{text1}</Text>
    </View>
  ),
  error: ({text1}) => (
    <View style={styles.errorToast}>
      <Text style={styles.toastText}>{text1}</Text>
    </View>
  ),
  favorites: ({text1}) => (
    <View style={styles.transparentToast}>
      <Text style={styles.toastText}>{text1}</Text>
    </View>
  ),
};

const ToastComponent = () => {
  return <Toast config={toastConfig} visibilityTime={2500} />;
};

const styles = StyleSheet.create({
  toast: {
    backgroundColor: '#039694',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 30,
  },
  errorToast: {
    backgroundColor: themeColors.ERROR,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 30,
  },
  toastText: {
    color: themeColors.WHITE,
  },
  transparentToast: {
    backgroundColor: themeColors.PRIMARY,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 30,
  },
});

export default ToastComponent;
