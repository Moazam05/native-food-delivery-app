import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Onboarding1, RightWhiteArrow} from '../../assets/images';
import {themeColors} from '../../constants/colors';
import {Fonts} from '../../constants/fonts';
import {onboarding} from '../../constants';
import Swiper from 'react-native-swiper';

const Onboarding = () => {
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isLastSlide = activeIndex === onboarding.length - 1;
  const isFirstSlide = activeIndex === 0;
  const navigation = useNavigation();

  const handleNext = () => {
    if (swiperRef.current && !isLastSlide) {
      swiperRef.current.scrollBy(1);
    }
  };

  const handlePrev = () => {
    if (swiperRef.current && !isFirstSlide) {
      swiperRef.current.scrollBy(-1);
    }
  };

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
              onIndexChanged={index => setActiveIndex(index)}
              showsPagination={false}
              loop={false}>
              {onboarding.map(item => (
                <View key={item.id} style={styles.slide}>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.description}>{item.description}</Text>
                </View>
              ))}
            </Swiper>

            <View style={styles.pagination}>
              {onboarding.map((_, index) => (
                <View key={index} style={styles.dotWrapper}>
                  {activeIndex === index ? (
                    <View style={styles.activeDot} />
                  ) : (
                    <View style={styles.dot} />
                  )}
                </View>
              ))}
            </View>

            <View style={styles.navigationButtons}>
              <TouchableOpacity onPress={handlePrev} disabled={isFirstSlide}>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                  <Text style={styles.navButton}>Skip</Text>
                </TouchableOpacity>
              </TouchableOpacity>
              {isLastSlide ? (
                ''
              ) : (
                <TouchableOpacity
                  onPress={handleNext}
                  disabled={isLastSlide}
                  style={styles.nextWrap}>
                  <Text style={styles.navButton}>Next</Text>
                  <Image source={RightWhiteArrow} style={styles.whiteArrow} />
                </TouchableOpacity>
              )}
            </View>
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
    height: 455,
    marginHorizontal: 32,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 35,
    paddingHorizontal: 30,
    paddingVertical: 32,
    backgroundColor: themeColors.PRIMARY,
    borderRadius: 48,
  },
  slide: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    color: themeColors.WHITE,
    textAlign: 'center',
    fontFamily: Fonts.BOLD,
  },
  description: {
    marginTop: 16,
    fontSize: 14,
    color: themeColors.WHITE,
    textAlign: 'center',
    fontFamily: Fonts.REGULAR,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 110,
  },
  dotWrapper: {
    marginHorizontal: 4,
  },
  dot: {
    width: 24,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#C2C2C2',
  },
  activeDot: {
    width: 24,
    height: 6,
    borderRadius: 3,
    backgroundColor: themeColors.WHITE,
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 16,
  },
  navButton: {
    fontSize: 14,
    color: themeColors.WHITE,
    fontFamily: Fonts.SEMIBOLD,
  },
  nextWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  whiteArrow: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
});
