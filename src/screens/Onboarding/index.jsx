import React, {useRef, useState} from 'react';
import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {OnboardArrow, Onboarding2, RightWhiteArrow} from '../../assets/images';
import Swiper from 'react-native-swiper';
import {themeColors} from '../../constants/colors';
import {onboarding} from '../../constants';
import {Fonts} from '../../constants/fonts';
import {useNavigation} from '@react-navigation/native';

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
        <Image source={Onboarding2} style={styles.backgroundImage} />
        <View style={styles.card}>
          <Swiper
            ref={swiperRef}
            showsPagination={false}
            loop={false}
            onIndexChanged={setActiveIndex}
            scrollEnabled={false}>
            {onboarding.map((item, index) => (
              <View key={index} style={styles.slide}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
              </View>
            ))}
          </Swiper>
          {/* Pagination */}
          <View
            style={[styles.pagination, isLastSlide && styles.lastPagination]}>
            {onboarding.map((_, i) => (
              <View key={i} style={styles.dotWrapper}>
                <View
                  style={i === activeIndex ? styles.activeDot : styles.dot}
                />
              </View>
            ))}
          </View>
          {/* bottom */}
          {isLastSlide ? (
            <TouchableOpacity
              style={styles.lastWrap}
              onPress={() => navigation.navigate('Login')}>
              <Image source={OnboardArrow} style={styles.OnboardArrow} />
            </TouchableOpacity>
          ) : (
            <View style={styles.navigationWrap}>
              <View style={styles.navigationButtons}>
                <TouchableOpacity onPress={handlePrev} disabled={isFirstSlide}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('Login')}>
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
          )}
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
    backgroundColor: '#000',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    position: 'absolute',
  },
  card: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: themeColors.PRIMARY,
    marginBottom: 32,
    marginHorizontal: 32,
    borderRadius: 48,
    height: 365,
  },
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    color: themeColors.WHITE,
    textAlign: 'center',
    fontFamily: Fonts.BOLD,
    marginBottom: 16,
  },
  description: {
    fontSize: 14,
    color: themeColors.WHITE,
    textAlign: 'center',
    fontFamily: Fonts.REGULAR,
    marginBottom: 16,
    marginHorizontal: 15,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 100,
  },
  lastPagination: {
    marginBottom: 25,
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
  navigationWrap: {
    justifyContent: 'flex-end',
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
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
  lastWrap: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  OnboardArrow: {
    width: 75,
    height: 75,
    resizeMode: 'contain',
    marginBottom: 10,
    marginTop: 5,
  },
});
