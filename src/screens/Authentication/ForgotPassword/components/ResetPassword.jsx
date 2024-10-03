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

const validationSchema = Yup.object().shape({});

const ResetPassword = () => {
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);

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
            <Text style={styles.title}>Reset Password</Text>
            <Text style={styles.h}>Hide</Text>
          </View>

          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            showsVerticalScrollIndicator={false}>
            <View style={styles.headingWrap}>
              <Text style={styles.heading}>Reset Password</Text>
              <Text style={styles.tagline}>
                Your new password must be different from the previously used
                password{' '}
              </Text>
            </View>

            <Formik
              initialValues={{}}
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

export default ResetPassword;

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
    width: 36,
    height: 36,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 18,
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
});
