import {View, Text, PermissionsAndroid} from 'react-native';
import React, {useEffect, useState} from 'react';
import Geolocation from 'react-native-geolocation-service';
import {GOOGLE_MAPS_API_KEY} from '@env';

const Home = () => {
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [userAddress, setUserAddress] = useState('');
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Foodies wants to access your location',
          message:
            'Foodies App needs access to your location' +
            'so you can order food from your favorite restaurants.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        setPermissionGranted(true);
        console.log('You can use the location');
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const getCurrentLocation = () => {
    if (permissionGranted) {
      Geolocation.getCurrentPosition(
        position => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
          fetchAddress(position.coords.latitude, position.coords.longitude);
        },
        error => {
          console.log(error.code, error.message);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    }
  };

  console.log('latitude', latitude);
  console.log('longitude', longitude);
  console.log('API KEY', GOOGLE_MAPS_API_KEY);

  const fetchAddress = async (lat, lng) => {
    const apiEndpoint = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_MAPS_API_KEY}`;
    try {
      const response = await fetch(apiEndpoint);
      const data = await response.json();
      console.log('data', data);
      if (data.results.length > 0) {
        const address = data.results[0].formatted_address;
        setUserAddress(address);
      } else {
        console.log('No address found');
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCurrentLocation();
  }, [permissionGranted]);

  useEffect(() => {
    requestLocationPermission();
  }, []);

  return (
    <View>
      <Text>Home</Text>
      <Text>User Address: {userAddress}</Text>
    </View>
  );
};

export default Home;
