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
import {useNavigation} from '@react-navigation/native';
// Formik
import {Formik} from 'formik';
import * as Yup from 'yup';
// CheckBox
import CheckBox from '@react-native-community/checkbox';
// Gesture Handler
import {GestureHandlerRootView} from 'react-native-gesture-handler';
// Safe Area Context
import {SafeAreaView} from 'react-native-safe-area-context';
// Toast Message
import Toast from 'react-native-toast-message';
// Redux Slice
import {addUser, selectUsers} from '../../redux/users/userSlice';
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
import useTypedSelector from '../../hooks/useTypedSelector';

// Validation Schema
const validationSchema = Yup.object().shape({
  userName: Yup.string().required('Username is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .required('Password must be at least 6 characters')
    .min(6, 'Password must be at least 6 characters'),
  agreeTerms: Yup.boolean().oneOf([true], 'You must agree to the terms'),
});

const SignUp = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const usersList = useTypedSelector(selectUsers);

  const [loading, setLoading] = useState(false);

  const handleSignUp = async values => {
    try {
      setLoading(true);
      const payload = {
        name: values.userName,
        email: values.email.toLowerCase(),
        password: values.password,
      };

      // find user based on email
      const findUser = usersList.find(
        user => user.email === values.email.toLowerCase(),
      );
      if (findUser) {
        setLoading(false);
        Toast.show({
          type: 'error',
          text1: 'User already exists with this email',
        });
        return;
      }
      await dispatch(addUser(payload));

      // Add a 2-second delay before navigating
      setTimeout(() => {
        setLoading(false);
        Toast.show({
          type: 'success',
          text1: 'Account created successfully',
        });
        navigation.navigate('Login');
      }, 2000); // 2000 milliseconds = 2 seconds
    } catch (error) {
      setLoading(false);
      Toast.show({
        type: 'error',
        text1: 'Error signing up',
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
              <Text style={styles.heading}>Create your new</Text>
              <Text style={styles.heading}>account</Text>
              <Text style={styles.tagline}>
                Create an account to start looking for the food you like
              </Text>
            </View>

            <Formik
              initialValues={{
                userName: '',
                email: '',
                password: '',
                agreeTerms: false,
              }}
              validationSchema={validationSchema}
              onSubmit={handleSignUp}>
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
                setFieldValue,
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
                      <Text style={styles.label}>User Name</Text>
                      <TextField
                        placeholder="User Name"
                        value={values.userName}
                        onChangeText={handleChange('userName')}
                        onBlur={handleBlur('userName')}
                        error={touched.userName && errors.userName}
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
                      <Text style={styles.errorText}>
                        {touched.password && errors.password}
                      </Text>
                    </View>

                    <View style={styles.agreeContainer}>
                      <CheckBox
                        value={values.agreeTerms}
                        onValueChange={value =>
                          setFieldValue('agreeTerms', value)
                        }
                        tintColors={{
                          true: themeColors.PRIMARY,
                          false:
                            touched.agreeTerms && errors.agreeTerms
                              ? themeColors.PRIMARY // red
                              : themeColors.GREY, // Change border color on error
                        }}
                      />
                      <Text style={styles.agreeText}>
                        I Agree with{' '}
                        <Text
                          style={styles.linkText}
                          onPress={() => navigation.navigate('TermsOfService')}>
                          Terms of Service
                        </Text>{' '}
                        and{' '}
                        <Text
                          style={styles.linkText}
                          onPress={() => navigation.navigate('PrivacyPolicy')}>
                          Privacy Policy
                        </Text>
                      </Text>
                    </View>

                    <View style={styles.buttonContainer}>
                      <CustomButton
                        name={
                          loading ? (
                            <ActivityIndicator color="#ffffff" />
                          ) : (
                            'Register'
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
                        Already have an account?{' '}
                        <Text
                          style={styles.signupLink}
                          onPress={() => navigation.navigate('Login')}>
                          Sign In
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

export default SignUp;

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
    marginTop: 20,
  },
  fieldContainer: {
    marginBottom: 15,
  },
  agreeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
    fontFamily: Fonts.MEDIUM,
    color: themeColors.BLACK,
    marginBottom: 8,
  },
  agreeText: {
    color: themeColors.BLACK,
    fontSize: 12,
    fontFamily: Fonts.REGULAR,
    marginLeft: 3,
  },
  linkText: {
    color: themeColors.PRIMARY,
    fontFamily: Fonts.SEMIBOLD,
  },
  buttonContainer: {
    marginTop: 15,
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
