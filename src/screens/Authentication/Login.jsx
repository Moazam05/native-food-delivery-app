import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
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
import CustomButton from '../../components/CustomButton';
import TextField from '../../components/TextField';
import {themeColors} from '../../constants/colors';
import {Fonts} from '../../constants/fonts';
// import {setUser} from '../../../redux/auth/authSlice';
import {Facebook, Google} from '../../assets/images';

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
              onSubmit={handleSignin}>
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
