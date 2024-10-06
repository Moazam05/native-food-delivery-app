import {GOOGLE_MAPS_API_KEY} from '@env';
import React, {useEffect, useState} from 'react';
import {FlatList, PermissionsAndroid, StyleSheet, View} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {categoriesData} from '../constants';
import Categories from '../screens/Home/components/Categories';
import HeroSection from '../screens/Home/components/HeroSection';
import ProductList from '../screens/Home/components/ProductList';

const Home = ({setSelectedTab}) => {
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('Burger');
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
      console.log('granted:', JSON.stringify(granted, null, 2));
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

  const getCurrentLocation = async () => {
    if (permissionGranted) {
      try {
        await Geolocation.getCurrentPosition(
          posit => {
            // console.log('position inside:', posit);
            setLatitude(posit.coords.latitude);
            setLongitude(posit.coords.longitude);
            fetchAddress();
          },
          error => {
            console.log('Error getting current location:', error);
            return null;
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
      } catch (error) {
        console.error('Error getting current location:', error);
      }
    }
  };

  const fetchAddress = async () => {
    const apiEndpoint = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_MAPS_API_KEY}`;
    const timeout = 10000; // 10 seconds
    const maxRetries = 3;
    let retries = 0;

    const fetchData = async () => {
      try {
        const response = await fetch(apiEndpoint, {timeout});
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('data', JSON.stringify(data));
        if (data.results.length > 0) {
          const address = data.results[0].formatted_address;
          setUserAddress(address);
        } else {
          console.log('No address found');
        }
      } catch (error) {
        if (retries < maxRetries) {
          retries++;
          console.log(`Retry ${retries}...`);
          await new Promise(resolve => setTimeout(resolve, 2000)); // wait 2 seconds
          await fetchData();
        } else {
          console.error('Error fetching address:', error);
        }
      }
    };

    await fetchData();
  };

  useEffect(() => {
    getCurrentLocation();
  }, [permissionGranted]);

  useEffect(() => {
    requestLocationPermission()
      .then(() => console.log('Permission requested'))
      .catch(error => console.error('Error requesting permission:', error));
  }, []);

  useEffect(() => {
    if (latitude && longitude) {
      fetchAddress();
    }
  }, [latitude, longitude]);

  return (
    <FlatList
      data={categoriesData}
      keyExtractor={item => item.id.toString()}
      ListHeaderComponent={
        <View>
          <HeroSection setSelectedTab={setSelectedTab} address={userAddress} />
          <Categories
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
          <ProductList selectedCategory={selectedCategory} />
        </View>
      }
      showsVerticalScrollIndicator={false}
      renderItem={null}
      ListFooterComponent={<View style={styles.footer} />}
      contentContainerStyle={styles.contentContainer}
    />
  );
};

export default Home;

const styles = StyleSheet.create({
  footer: {
    marginBottom: 80,
  },
  contentContainer: {
    paddingTop: 20,
  },
});
