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
  TouchableOpacity,
} from 'react-native';
// React Navigation
import {useNavigation, useRoute} from '@react-navigation/native';
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
import CustomButton from '../../../../components/CustomButton';
import TextField from '../../../../components/TextField';
import PasswordChangeModal from './PasswordChangeModal';
// Constants
import {themeColors} from '../../../../constants/colors';
import {Fonts} from '../../../../constants/fonts';
// Assets
import {Back} from '../../../../assets/images';
// Hooks
import useTypedSelector from '../../../../hooks/useTypedSelector';
// Redux Slice
import {selectUsers, updateUser} from '../../../../redux/users/userSlice';
// Redux
import {useDispatch} from 'react-redux';

const validationSchema = Yup.object().shape({
  newPassword: Yup.string()
    .required('New Password is required')
    .min(6, 'New Password must be at least 6 characters'),
  confirmPassword: Yup.string()
    .required('Confirm Password is required')
    .oneOf([Yup.ref('newPassword'), null], 'Passwords must match'),
});

const ResetPassword = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const usersList = useTypedSelector(selectUsers);
  const route = useRoute();
  const {email} = route.params || {};

  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const handleVerify = async values => {
    try {
      setLoading(true);

      // Find user based on email
      const findUser = usersList.find(
        user => user.email === email.toLowerCase(),
      );

      if (!findUser) {
        throw new Error('User not found');
      }

      // Update user password
      const updatedUser = {
        ...findUser,
        password: values.newPassword,
      };

      setTimeout(async () => {
        setLoading(false);
        await dispatch(updateUser(updatedUser));
        setModalVisible(true);
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
              initialValues={{
                newPassword: '',
                confirmPassword: '',
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
              }) => {
                return (
                  <View style={styles.formContainer}>
                    <View style={styles.fieldContainer}>
                      <Text style={styles.label}>New Password</Text>

                      <TextField
                        placeholder="New Password"
                        value={values.newPassword}
                        onChangeText={handleChange('newPassword')}
                        onBlur={handleBlur('newPassword')}
                        error={touched.newPassword && errors.newPassword}
                        secureTextEntry={true}
                      />
                      <Text style={styles.errorText}>
                        {touched.newPassword && errors.newPassword}
                      </Text>
                    </View>

                    <View style={styles.fieldContainer}>
                      <Text style={styles.label}>Confirm Password</Text>

                      <TextField
                        placeholder="Confirm Password"
                        value={values.confirmPassword}
                        onChangeText={handleChange('confirmPassword')}
                        onBlur={handleBlur('confirmPassword')}
                        error={
                          touched.confirmPassword && errors.confirmPassword
                        }
                        secureTextEntry={true}
                      />
                      <Text style={styles.errorText}>
                        {touched.confirmPassword && errors.confirmPassword}
                      </Text>
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
        {/* Modal */}
        <PasswordChangeModal
          visible={modalVisible}
          setModalVisible={setModalVisible}
        />
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
  fieldContainer: {
    marginBottom: 7,
  },
  label: {
    fontSize: 14,
    fontFamily: Fonts.MEDIUM,
    color: themeColors.BLACK,
    marginBottom: 8,
  },
  buttonContainer: {
    marginTop: 50,
  },
});
