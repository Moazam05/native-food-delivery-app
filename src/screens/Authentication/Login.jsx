import AsyncStorage from '@react-native-async-storage/async-storage';
import {Formik} from 'formik';
import React, {useState} from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import {useDispatch} from 'react-redux';
import * as Yup from 'yup';
import {
  GoogleIcon,
  PasswordTextFieldIcon,
  UserTextFieldIcon,
} from '../../assets/images';
import CustomButton from '../../components/CustomButton';
import TextField from '../../components/TextField';
import {themeColors} from '../../constants/colors';
import {Fonts} from '../../constants/fonts';
import {setUser} from '../../redux/auth/authSlice';
import {useNavigation} from '@react-navigation/native';

// Validation Schema
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string().required('Password is required'),
});

const Login = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const handleSignin = async values => {
    setLoading(true);
  };

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor="transparent"
      />
      <View>
        <Text>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus,
          aperiam quidem sapiente nulla deleniti saepe dolores quibusdam,
          architecto praesentium in nesciunt facilis soluta! Ex aut molestiae
          totam itaque. Ab, earum!
        </Text>
      </View>
    </>
  );
};

export default Login;

const styles = StyleSheet.create({
  gestureHandle: {
    flex: 1,
    backgroundColor: themeColors.WHITE,
  },
  container: {
    flex: 1,
    marginHorizontal: 30,
    marginVertical: 20,
  },

  scrollContainer: {
    paddingBottom: 20,
  },
  headingWrap: {
    marginTop: 20,
  },
  heading: {
    fontSize: 36,
    fontFamily: Fonts.BOLD,
    color: themeColors.BLACK,
  },
  formContainer: {
    marginTop: 36,
  },
  fieldContainer: {
    marginBottom: 30,
  },
  forgotPasswordContainer: {
    marginTop: 5,
    alignItems: 'flex-end',
  },
  forgotPasswordText: {
    color: themeColors.PRIMARY,
    fontSize: 12,
    fontFamily: Fonts.REGULAR,
  },
  buttonContainer: {
    marginTop: 50,
  },
  orContainer: {
    marginTop: 75,
    justifyContent: 'center',
    alignItems: 'center',
  },
  orText: {
    color: themeColors.TEXT,
    fontSize: 14,
    fontFamily: Fonts.REGULAR,
  },
  googleIconContainer: {
    marginTop: 20,
    marginBottom: 30,
  },
  googleIcon: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  signupContainer: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signupText: {
    color: themeColors.TEXT,
    fontSize: 14,
    fontFamily: Fonts.REGULAR,
  },
  signupLink: {
    color: themeColors.PRIMARY,
    fontFamily: Fonts.SEMIBOLD,
    fontSize: 14,
    textDecorationColor: themeColors.PRIMARY,
    textDecorationLine: 'underline',
  },
});
