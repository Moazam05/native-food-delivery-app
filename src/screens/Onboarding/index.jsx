import {View, Text, StyleSheet, StatusBar, Image} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {Onboarding1} from '../../assets/images';
import {themeColors} from '../../constants/colors';
import {Fonts} from '../../constants/fonts';

const Onboarding = () => {
  return (
    <>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <View style={styles.container}>
        <View style={styles.coverImg}>
          <Image source={Onboarding1} style={styles.imgWrap} />
        </View>
        <View style={styles.content}>
          <Text style={styles.tagLine}>You want Authentic, here you go!</Text>
          <Text style={styles.findText}>Find it here, buy it now!</Text>
        </View>
      </View>
    </>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 0,
  },
  coverImg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: '100%',
  },
  imgWrap: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  content: {
    alignItems: 'center',
    marginBottom: 35,
    paddingHorizontal: 25,
  },
  tagLine: {
    fontSize: 34,
    color: themeColors.WHITE,
    fontFamily: Fonts.SEMIBOLD,
    textAlign: 'center',
    marginBottom: 15,
  },
  findText: {
    fontSize: 14,
    color: '#F2F2F2',
    fontFamily: Fonts.REGULAR,
    textAlign: 'center',
    marginBottom: 45,
  },
});
