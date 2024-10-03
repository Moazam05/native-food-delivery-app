// React Import
import React, {useState} from 'react';
// React Native
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
// Async Storage
import AsyncStorage from '@react-native-async-storage/async-storage';
// React Navigation
import {useNavigation} from '@react-navigation/native';
// Formik
import {Formik} from 'formik';
import * as Yup from 'yup';
// Gesture Handler
import {GestureHandlerRootView} from 'react-native-gesture-handler';
// Safe Area Context
import {SafeAreaView} from 'react-native-safe-area-context';
// Toast Message
import Toast from 'react-native-toast-message';
// Redux
import {useDispatch} from 'react-redux';
// Constants
import {themeColors} from '../../constants/colors';
import {Fonts} from '../../constants/fonts';
// Assets
import {Facebook, Google} from '../../assets/images';
// Custom
import CustomButton from '../../components/CustomButton';
import TextField from '../../components/TextField';
// Hooks
import useTypedSelector from '../../hooks/useTypedSelector';
// Redux Slice
import {selectUsers} from '../../redux/users/userSlice';
import {setUser} from '../../redux/auth/authSlice';

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
  const usersList = useTypedSelector(selectUsers);

  const [loading, setLoading] = useState(false);

  const handleSignIn = async values => {
    try {
      setLoading(true);

      // Find user based on email
      const findUser = usersList.find(
        user => user.email === values.email.toLowerCase(),
      );

      if (!findUser) {
        throw new Error('User not found');
      }

      if (findUser.password !== values.password) {
        throw new Error('Invalid password');
      }

      setTimeout(async () => {
        setLoading(false);
        // Set user in local storage
        await AsyncStorage.setItem('user', JSON.stringify(findUser));
        dispatch(setUser(findUser));
        // Navigate to home screen
        navigation.navigate('Home');

        Toast.show({
          type: 'success',
          text1: 'Logged in successfully',
        });
      }, 2000);
    } catch (error) {
      setLoading(false);
      Toast.show({
        type: 'error',
        text1: error.message,
      });
    }
  };

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor="transparent"
      />

      <GestureHandlerRootView style={styles.gestureHandle}>
        <SafeAreaView style={styles.container}>
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            showsVerticalScrollIndicator={false}>
            <View style={styles.headingWrap}>
              <Text style={styles.heading}>Login to your</Text>
              <Text style={styles.heading}>account</Text>
              <Text style={styles.tagline}>Please sign in to your account</Text>
            </View>

            <Formik
              initialValues={{email: '', password: ''}}
              validationSchema={validationSchema}
              onSubmit={handleSignIn}>
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
              }) => {
                return (
                  <View style={styles.formContainer}>
                    <View style={styles.fieldContainer}>
                      <Text style={styles.label}>Email Address</Text>

                      <TextField
                        placeholder="Email Address"
                        value={values.email}
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                        keyboardType="email-address"
                        error={touched.email && errors.email}
                      />
                    </View>
                    <View style={styles.fieldContainer}>
                      <Text style={styles.label}>Password</Text>

                      <TextField
                        placeholder="Password"
                        value={values.password}
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        error={touched.password && errors.password}
                        secureTextEntry={true}
                      />
                    </View>
                    <View style={styles.forgotPasswordContainer}>
                      <Text
                        style={styles.forgotPasswordText}
                        onPress={() => navigation.navigate('ForgotPassword')}>
                        Forgot Password?
                      </Text>
                    </View>

                    <View style={styles.buttonContainer}>
                      <CustomButton
                        name={
                          loading ? (
                            <ActivityIndicator color="#ffffff" />
                          ) : (
                            'Sign In'
                          )
                        }
                        onPress={handleSubmit}
                        disabled={loading}
                      />
                    </View>

                    <View style={styles.orContainer}>
                      <View style={styles.orWrap}>
                        <View style={styles.orLine} />
                        <Text style={styles.orText}> or sign in with </Text>
                        <View style={styles.orLine} />
                      </View>

                      <View style={styles.googleIconContainer}>
                        <Image source={Google} style={styles.googleIcon} />
                        <Image source={Facebook} style={styles.googleIcon} />
                      </View>
                    </View>

                    <View style={styles.signupContainer}>
                      <Text style={styles.signupText}>
                        Don't have an account?{' '}
                        <Text
                          style={styles.signupLink}
                          onPress={() => navigation.navigate('SignUp')}>
                          Register
                        </Text>
                      </Text>
                    </View>
                  </View>
                );
              }}
            </Formik>
          </ScrollView>
        </SafeAreaView>
      </GestureHandlerRootView>
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
  errorText: {
    color: themeColors.PRIMARY,
    fontSize: 12,
  },
  heading: {
    fontSize: 32,
    fontFamily: Fonts.SEMIBOLD,
    color: themeColors.BLACK,
  },
  tagline: {
    fontSize: 14,
    fontFamily: Fonts.MEDIUM,
    color: themeColors.GRAY,
  },
  formContainer: {
    marginTop: 36,
  },
  fieldContainer: {
    marginBottom: 15,
  },
  forgotPasswordContainer: {
    alignItems: 'flex-end',
  },
  label: {
    fontSize: 14,
    fontFamily: Fonts.MEDIUM,
    color: themeColors.BLACK,
    marginBottom: 8,
  },
  forgotPasswordText: {
    color: themeColors.PRIMARY,
    fontSize: 12,
    fontFamily: Fonts.REGULAR,
  },
  buttonContainer: {
    marginTop: 40,
  },
  orContainer: {
    marginTop: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  orText: {
    color: themeColors.GRAY,
    fontSize: 14,
    fontFamily: Fonts.REGULAR,
  },
  googleIconContainer: {
    marginTop: 25,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 15,
  },
  googleIcon: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  signupContainer: {
    marginTop: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signupText: {
    color: themeColors.BLACK,
    fontSize: 14,
    fontFamily: Fonts.MEDIUM,
  },
  signupLink: {
    color: themeColors.PRIMARY,
    fontFamily: Fonts.SEMIBOLD,
    fontSize: 14,
  },

  orWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  orLine: {
    flex: 1,
    height: 1,
    backgroundColor: themeColors.LIGHTGREY,
  },
});
