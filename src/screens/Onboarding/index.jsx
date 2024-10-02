import {View, Text, StyleSheet, StatusBar, Image} from 'react-native';
import React, {useRef, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Onboarding1} from '../../assets/images';
import {themeColors} from '../../constants/colors';
import {Fonts} from '../../constants/fonts';
import {onboarding} from '../../constants';
import Swiper from 'react-native-swiper';

const Onboarding = () => {
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isLastSlide = activeIndex === onboarding.length - 1;
  const navigation = useNavigation();

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
        <View style={styles.contentWrap}>
          <View style={styles.content}>
            <Swiper
              ref={swiperRef}
              loop={false}
              onIndexChanged={index => setActiveIndex(index)}>
              {onboarding.map(item => (
                <View key={item.id} style={styles.slide}>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.description}>{item.description}</Text>
                </View>
              ))}
            </Swiper>
          </View>
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
  contentWrap: {
    marginHorizontal: 32,
  },
  content: {
    alignItems: 'center',
    marginBottom: 35,
    paddingHorizontal: 30,
    paddingVertical: 32,
    backgroundColor: themeColors.PRIMARY,
    borderRadius: 48,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    marginTop: 20,
    fontSize: 24,
    color: themeColors.BLACK,
    textAlign: 'center',
    fontFamily: Fonts.EXTRABOLD,
  },
  description: {
    marginTop: 10,
    fontSize: 14,
    color: themeColors.GRAY,
    textAlign: 'center',
    paddingHorizontal: 20,
    fontFamily: Fonts.SEMIBOLD,
  },
});
