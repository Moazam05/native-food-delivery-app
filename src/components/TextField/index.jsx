import React, {useState} from 'react';
import {
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {HideEye, OpenEye} from '../../assets/images';
import {themeColors} from '../../constants/colors';

const TextField = ({
  error,
  placeholder,
  value,
  onChangeText,
  onBlur,
  keyboardType,
  secureTextEntry,
  multiline,
  leftIcon,
  inputWrap,
  editable,
  textStyle,
  maxLength,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.inputContainer}>
      <View style={[styles.input, inputWrap, error ? styles.inputError : null]}>
        {leftIcon && <View style={styles.leftIconContainer}>{leftIcon}</View>}
        <TextInput
          style={[
            styles.textInput,
            textStyle,
            multiline ? styles.multilineInput : null,
          ]}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          onBlur={onBlur}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry && !showPassword}
          multiline={multiline}
          numberOfLines={multiline ? 3 : 1}
          textAlignVertical={multiline ? 'top' : 'center'}
          placeholderTextColor="#676767"
          editable={editable}
          maxLength={maxLength}
        />
      </View>
      {secureTextEntry && (
        <TouchableOpacity
          style={styles.eyeIconContainer}
          onPress={() => setShowPassword(!showPassword)}>
          <Image
            source={showPassword ? OpenEye : HideEye}
            style={styles.eyeIcon}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default TextField;

const styles = StyleSheet.create({
  inputContainer: {
    position: 'relative',
  },
  input: {
    borderColor: '#D6D6D6',
    borderWidth: 1,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    height: 55,
  },
  leftIconContainer: {
    marginRight: 5,
    width: 25,
  },
  textInput: {
    flex: 1,
    paddingVertical: 10,
  },
  multilineInput: {
    minHeight: 100,
    maxHeight: 200,
  },
  inputError: {
    borderColor: themeColors.PRIMARY,
  },
  eyeIconContainer: {
    position: 'absolute',
    right: 15,
    top: 18,
  },
  eyeIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    tintColor: '#626262',
  },
});
