import {useNavigation} from '@react-navigation/native';
import {Formik} from 'formik';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import * as Yup from 'yup';
import CustomButton from '../../../../components/CustomButton';
import TextField from '../../../../components/TextField';
import {themeColors} from '../../../../constants/colors';
import {Fonts} from '../../../../constants/fonts';
import {Back, Time} from '../../../../assets/images';

const validationSchema = Yup.object().shape({
  otp1: Yup.string().required('Required'),
  otp2: Yup.string().required('Required'),
  otp3: Yup.string().required('Required'),
  otp4: Yup.string().required('Required'),
});

const EmailVerification = () => {
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);
  const [time, setTime] = useState(60); // 1 minute timer

  useEffect(() => {
    const timer = setInterval(() => {
      if (time > 0) {
        setTime(time - 1);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [time]);

  const handleVerify = async values => {
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
          {/* Top Bar */}
          <View style={styles.topBar}>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}>
              <Image source={Back} style={styles.backIcon} />
            </TouchableOpacity>
            <Text style={styles.title}>OTP</Text>
            <Text style={styles.h}>Hide</Text>
          </View>

          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            showsVerticalScrollIndicator={false}>
            <View style={styles.headingWrap}>
              <Text style={styles.heading}>Email verification</Text>
              <Text style={styles.tagline}>
                Enter the verification code we send you on:
              </Text>
              <Text style={styles.tagline}>salman@gmail.com</Text>
            </View>

            <Formik
              initialValues={{
                otp1: '',
                otp2: '',
                otp3: '',
                otp4: '',
              }}
              validationSchema={validationSchema}
              onSubmit={handleVerify}>
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
                    <View style={styles.otpContainer}>
                      <TextField
                        placeholder=""
                        value={values.otp1}
                        onChangeText={handleChange('otp1')}
                        onBlur={handleBlur('otp1')}
                        keyboardType="number-pad"
                        inputWrap={styles.otpInput}
                        textStyle={styles.otpInputText}
                        error={touched.otp1 && errors.otp1}
                        maxLength={1}
                      />
                      <TextField
                        placeholder=""
                        value={values.otp2}
                        onChangeText={handleChange('otp2')}
                        onBlur={handleBlur('otp2')}
                        keyboardType="number-pad"
                        inputWrap={styles.otpInput}
                        textStyle={styles.otpInputText}
                        error={touched.otp2 && errors.otp2}
                        maxLength={1}
                      />
                      <TextField
                        placeholder=""
                        value={values.otp3}
                        onChangeText={handleChange('otp3')}
                        onBlur={handleBlur('otp3')}
                        keyboardType="number-pad"
                        inputWrap={styles.otpInput}
                        error={touched.otp3 && errors.otp3}
                        textStyle={styles.otpInputText}
                        maxLength={1}
                      />
                      <TextField
                        placeholder=""
                        value={values.otp4}
                        onChangeText={handleChange('otp4')}
                        onBlur={handleBlur('otp4')}
                        keyboardType="number-pad"
                        inputWrap={styles.otpInput}
                        textStyle={styles.otpInputText}
                        error={touched.otp4 && errors.otp4}
                        maxLength={1}
                      />
                    </View>

                    <View style={styles.receivedWrap}>
                      <Text style={styles.didntReceiveText}>
                        Didn't receive code?
                      </Text>
                      <TouchableOpacity
                        onPress={() => setTime(60)}
                        disabled={time > 0}
                        style={{opacity: time > 0 ? 0.5 : 1}}>
                        <Text style={styles.resendText}>Resend</Text>
                      </TouchableOpacity>
                    </View>

                    <View style={styles.timeWrap}>
                      <Image source={Time} style={styles.timeIcon} />
                      <Text style={styles.timeText}>
                        {Math.floor(time / 60)
                          .toString()
                          .padStart(2, '0')}
                        :
                        {time % 60 === 0
                          ? '00'
                          : (time % 60).toString().padStart(2, '0')}
                      </Text>
                    </View>

                    <View style={styles.buttonContainer}>
                      <CustomButton
                        name={
                          loading ? (
                            <ActivityIndicator color="#ffffff" />
                          ) : (
                            'Verify'
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

export default EmailVerification;

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

  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 16,
    fontFamily: Fonts.SEMIBOLD,
    color: themeColors.BLACK,
  },
  h: {
    opacity: 0,
  },

  scrollContainer: {
    paddingBottom: 20,
  },
  headingWrap: {
    marginTop: 32,
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
    marginTop: 32,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  otpInput: {
    width: 65,
    height: 62,
    borderRadius: 12,
    borderColor: themeColors.GRAY,
    borderWidth: 1,
    textAlign: 'center',
  },
  otpInputText: {
    fontSize: 30,
  },
  buttonContainer: {
    marginTop: 40,
  },

  receivedWrap: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
    alignItems: 'center',
    gap: 5,
  },

  didntReceiveText: {
    fontSize: 14,
    fontFamily: Fonts.MEDIUM,
    color: themeColors.GRAY,
  },
  resendText: {
    fontSize: 14,
    fontFamily: Fonts.MEDIUM,
    color: themeColors.PRIMARY,
  },
  timeWrap: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 45,
  },
  timeIcon: {
    width: 19,
    height: 19,
    resizeMode: 'contain',
  },
  timeText: {
    fontSize: 15,
    fontFamily: Fonts.MEDIUM,
    color: themeColors.GRAY,
    marginLeft: 5,
  },
});
