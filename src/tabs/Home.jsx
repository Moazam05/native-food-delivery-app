import {GOOGLE_MAPS_API_KEY} from '@env';
import React, {useEffect, useState} from 'react';
import {AppState, FlatList, Linking, StyleSheet, View} from 'react-native';
import {categoriesData} from '../constants';
import Categories from '../screens/Home/components/Categories';
import HeroSection from '../screens/Home/components/HeroSection';
import ProductList from '../screens/Home/components/ProductList';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {check, PERMISSIONS, request} from 'react-native-permissions';
import CustomButton from '../components/CustomButton';
import {themeColors} from '../constants/colors';

const Home = ({setSelectedTab}) => {
  const [selectedCategory, setSelectedCategory] = useState('Burger');
  const [userAddress, setUserAddress] = useState('');
  const [locationPermission, setLocationPermission] = useState(null);

  useEffect(() => {
    const handlePermission = async () => {
      const fineLocationStatus = await check(
        PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      );
      const coarseLocationStatus = await check(
        PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
      );

      if (
        fineLocationStatus === 'undetermined' ||
        coarseLocationStatus === 'undetermined'
      ) {
        const requestedPermission = await request(
          PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        );
        setLocationPermission(requestedPermission);
      } else {
        setLocationPermission(
          fineLocationStatus === 'granted' || coarseLocationStatus === 'granted'
            ? 'granted'
            : fineLocationStatus,
        );
      }
    };

    handlePermission();
  }, []);

  useEffect(() => {
    const handleAppStateChange = async state => {
      if (state === 'active') {
        const fineLocationStatus = await check(
          PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        );
        const coarseLocationStatus = await check(
          PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
        );

        setLocationPermission(
          fineLocationStatus === 'granted' || coarseLocationStatus === 'granted'
            ? 'granted'
            : fineLocationStatus,
        );
      }
    };

    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );

    return () => {
      subscription.remove(); // Use the remove method on the subscription
    };
  }, []);

  useEffect(() => {
    if (locationPermission === 'denied') {
      const timeoutId = setTimeout(async () => {
        const requestedPermission = await request(
          PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        );
        setLocationPermission(requestedPermission);
      }, 1000);
      return () => clearTimeout(timeoutId);
    }
  }, [locationPermission]);

  return (
    <FlatList
      data={categoriesData}
      keyExtractor={item => item.id.toString()}
      ListHeaderComponent={
        <View style={styles.container}>
          <HeroSection setSelectedTab={setSelectedTab} address={userAddress} />
          <Categories
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
          <ProductList selectedCategory={selectedCategory} />

          {locationPermission !== 'granted' && (
            <View style={styles.permissionPrompt}>
              <CustomButton
                name="Enable Location Permission"
                loginStyle={styles.buttonStyle}
                onPress={() => {
                  Linking.openSettings();
                }}
              />
            </View>
          )}
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
  container: {
    position: 'relative',
  },
  permissionPrompt: {
    position: 'absolute',
    bottom: 190,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  buttonStyle: {
    width: '80%',
    backgroundColor: themeColors.ERROR,
  },
});
