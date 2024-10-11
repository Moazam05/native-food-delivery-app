import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
  AppState,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {themeColors} from '../../../constants/colors';
import {Fonts} from '../../../constants/fonts';
import {
  ArrowDown,
  HomeBG,
  Location,
  Notification,
  Search,
} from '../../../assets/images';
import useTypedSelector from '../../../hooks/useTypedSelector';
import {selectedAddress, setAddress} from '../../../redux/address/addressSlice';
import {GOOGLE_MAPS_API_KEY} from '@env';
import GetLocation from 'react-native-get-location';
import {useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import GPSModal from './GPSModal';

const HeroSection = ({setSelectedTab}) => {
  const dispatch = useDispatch();
  const getCurrentAddress = useTypedSelector(selectedAddress);

  const [locationEnabled, setLocationEnabled] = useState(false);
  const [userLocation, setUserLocation] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(true);
  const [currentAddress, setCurrentAddress] = useState('');

  console.log('getCurrentAddress', getCurrentAddress);

  // todo: Check location services
  useEffect(() => {
    if (!getCurrentAddress?.latitude) {
      checkLocationServices();
    }
  }, []);

  // todo: Listen to app state changes (foreground/background) ***IMPORTANT***
  useEffect(() => {
    const appStateListener = AppState.addEventListener(
      'change',
      nextAppState => {
        if (nextAppState === 'active' && !locationEnabled) {
          checkLocationServices();
        }
      },
    );

    return () => appStateListener.remove();
  }, [locationEnabled]);

  // todo: Get Location Coordinates
  const checkLocationServices = useCallback(async () => {
    setLoading(true);

    try {
      const location = await GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      });

      if (location) {
        const newUserLocation = {
          latitude: location.latitude,
          longitude: location.longitude,
        };

        setLocationEnabled(true);
        setLoading(false);
        setModalVisible(false);

        setUserLocation(newUserLocation);
        dispatch(setAddress(newUserLocation));
        AsyncStorage.setItem('userLocation', JSON.stringify(newUserLocation));
      }
    } catch (error) {
      setLoading(false);
    }
  }, []);

  // todo: Get Address from Coordinates
  useEffect(() => {
    if (userLocation.latitude && userLocation.longitude) {
      const fetchAddress = async () => {
        try {
          const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${userLocation.latitude},${userLocation.longitude}&key=${GOOGLE_MAPS_API_KEY}`;
          const response = await axios.get(url);
          if (response) {
            const address = response.data.results[0]?.formatted_address;
            setCurrentAddress(address);
          }
        } catch (error) {
          console.error('Error getting address:', error);
        }
      };

      fetchAddress();
    }
  }, [userLocation]);

  return (
    <>
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

                  <Text style={styles.locationName}>Dummy Address</Text>
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

      {/* Modal */}
      {!getCurrentAddress?.latitude && (
        <GPSModal visible={modalVisible} loading={loading} />
      )}
    </>
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
