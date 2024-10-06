import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
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

const HeroSection = ({setSelectedTab, address}) => {
  return (
    <ImageBackground source={HomeBG} style={styles.home}>
      <View style={styles.overlayContent}>
        <View>
          <View style={styles.header}>
            <View>
              <View style={styles.location}>
                <Text style={styles.locationText}>Your Location</Text>
                <Image source={ArrowDown} style={styles.arrowDown} />
              </View>
              <View style={styles.locationDetails}>
                <Image source={Location} style={styles.locationIcon} />

                <Text style={styles.locationName}>{address}</Text>
              </View>
            </View>
            <View style={styles.imgWrap}>
              <TouchableOpacity
                onPress={() => {
                  setSelectedTab(2);
                }}>
                <Image source={Search} style={styles.searchIcon} />
              </TouchableOpacity>
              <Image source={Notification} style={styles.searchIcon} />
            </View>
          </View>
          <View style={styles.taglineContainer}>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 45,
    width: '100%',
  },
  location: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 5,
  },
  locationDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  locationText: {
    color: themeColors.WHITE,
    fontSize: 14,
    fontFamily: Fonts.REGULAR,
    lineHeight: 20,
  },
  locationName: {
    color: themeColors.WHITE,
    fontSize: 11,
    fontFamily: Fonts.SEMIBOLD,
    flexWrap: 'wrap',
    width: 180,
  },
  arrowDown: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
  },
  locationIcon: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
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
  taglineContainer: {},
  tagline: {
    color: themeColors.WHITE,
    fontSize: 30,
    fontFamily: Fonts.SEMIBOLD,
  },
});
