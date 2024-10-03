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
import CheckBox from '@react-native-community/checkbox';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import * as Yup from 'yup';
import CustomButton from '../../../components/CustomButton';
import TextField from '../../../components/TextField';
import {themeColors} from '../../../constants/colors';
import {Fonts} from '../../../constants/fonts';
// import {setUser} from '../../../redux/auth/authSlice';
import {Facebook, Google} from '../../../assets/images';

// Validation Schema
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
});

const ForgotPassword = () => {
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);

  const handleSignUp = async values => {
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
    marginTop: 70,
    flex: 1,
    justifyContent: 'flex-end',
  },
});
