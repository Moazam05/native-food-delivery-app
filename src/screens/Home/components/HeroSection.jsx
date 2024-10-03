import {View, Text, StyleSheet, ImageBackground, Image} from 'react-native';
import React from 'react';
import {themeColors} from '../../../constants/colors';
import {Fonts} from '../../../constants/fonts';
import {
  ArrowDown,
  HomeBG,
  Location,
  Notification,
  Search,
} from '../../../assets/images';

const HeroSection = () => {
  return (
    <ImageBackground source={HomeBG} style={styles.home}>
      <View style={styles.overlayContent}>
        <View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 20,
              marginTop: 45,
              width: '100%',
            }}>
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 10,
                  marginBottom: 5,
                }}>
                <Text style={styles.locationText}>Your Location</Text>
                <Image
                  source={ArrowDown}
                  style={{
                    width: 16,
                    height: 16,
                    resizeMode: 'contain',
                  }}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 10,
                }}>
                <Image
                  source={Location}
                  style={{
                    width: 16,
                    height: 16,
                    resizeMode: 'contain',
                  }}
                />

                <Text style={styles.locationName}>Ichhra Lahore</Text>
              </View>
            </View>
            <View style={styles.imgWrap}>
              <Image source={Search} style={styles.searchIcon} />
              <Image source={Notification} style={styles.searchIcon} />
            </View>
          </View>
          <View>
            <Text style={styles.tagline}>Provide the best</Text>
            <Text style={styles.tagline}>food for you</Text>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

export default HeroSection;

const styles = StyleSheet.create({
  home: {
    width: '100%',
    height: 240,
    resizeMode: 'cover',
  },
  overlayContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 25,
  },
  locationText: {
    color: themeColors.WHITE,
    fontSize: 14,
    fontFamily: Fonts.REGULAR,
    lineHeight: 20,
  },
  locationName: {
    color: themeColors.WHITE,
    fontSize: 14,
    fontFamily: Fonts.SEMIBOLD,
  },
  searchIcon: {
    width: 35,
    height: 35,
    resizeMode: 'contain',
  },
  imgWrap: {
    flexDirection: 'row',
    gap: 15,
  },
  tagline: {
    color: themeColors.WHITE,
    fontSize: 32,
    fontFamily: Fonts.SEMIBOLD,
  },
});
