// React Import
import React, {useState} from 'react';
// React Native
import {
  ActivityIndicator,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
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
// Custom
import CustomButton from '../../../components/CustomButton';
import TextField from '../../../components/TextField';
// Constants
import {themeColors} from '../../../constants/colors';
import {Fonts} from '../../../constants/fonts';
// Hooks
import useTypedSelector from '../../../hooks/useTypedSelector';
// Redux Slice
import {selectUsers} from '../../../redux/users/userSlice';

// Validation Schema
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
});

const ForgotPassword = () => {
  const navigation = useNavigation();
  const usersList = useTypedSelector(selectUsers);

  const [loading, setLoading] = useState(false);

  const handleSignUp = async values => {
    try {
      setLoading(true);

      // Find user based on email
      const findUser = usersList.find(
        user => user.email === values.email.toLowerCase(),
      );

      if (!findUser) {
        throw new Error('User not found');
      }

      navigation.navigate('EmailVerification');
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: error.message,
      });
    } finally {
      setLoading(false);
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
              <Text style={styles.heading}>Forgot password?</Text>
              <Text style={styles.tagline}>
                Enter your email address and we’ll send you confirmation code to
                reset your password{' '}
              </Text>
            </View>

            <Formik
              initialValues={{
                email: '',
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

                    <View style={styles.buttonContainer}>
                      <CustomButton
                        name={
                          loading ? (
                            <ActivityIndicator color="#ffffff" />
                          ) : (
                            'Continue'
                          )
                        }
                        onPress={handleSubmit}
                        disabled={loading}
                      />
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

export default ForgotPassword;

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
    marginTop: 160,
  },
});
