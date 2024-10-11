import {GOOGLE_MAPS_API_KEY} from '@env';
import BottomSheet from '@gorhom/bottom-sheet';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import GetLocation from 'react-native-get-location';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {RestaurantIcon} from '../../assets/images';
import {themeColors} from '../../constants/colors';
import OrderDetailBottomSheet from './components/OrderDetailBottomSheet';
import {useRoute} from '@react-navigation/native';

const OrderTracking = () => {
  const mapRef = useRef();
  const bottomSheetRef = useRef(null);
  const route = useRoute();
  const {total} = route.params || {};

  const [userLocation, setUserLocation] = useState({
    latitude: 0,
    longitude: 0,
  });

  const destination = {
    latitude: 31.52354,
    longitude: 74.28956,
  };

  useEffect(() => {
    checkLocationServices();
  }, []);

  const checkLocationServices = useCallback(async () => {
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

        setUserLocation(newUserLocation);

        if (mapRef.current) {
          const coordinates = [newUserLocation, destination];

          mapRef.current.fitToCoordinates(coordinates, {
            edgePadding: {top: 50, right: 50, bottom: 250, left: 50},
            animated: true,
          });
        }
      }
    } catch (error) {
      console.error('Error getting location:', error);
    }
  }, [destination]);

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.mapWrap}>
        <MapView
          ref={mapRef}
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            ...userLocation,
            latitudeDelta: 0.135, // Initial zoom level
            longitudeDelta: 0.135,
          }}>
          <Marker coordinate={userLocation} title="Current Location" />
          <Marker
            coordinate={destination}
            icon={RestaurantIcon}
            title="Restaurant"
          />

          {userLocation.latitude !== 0 && userLocation.longitude !== 0 && (
            <MapViewDirections
              origin={userLocation}
              destination={destination}
              apikey={GOOGLE_MAPS_API_KEY}
              strokeWidth={3}
              strokeColor={themeColors.PRIMARY}
              onError={error =>
                console.error('MapViewDirections error:', error)
              }
            />
          )}
        </MapView>
        <View style={styles.currentLocation}>
          <FontAwesome6
            name="location-arrow"
            size={22}
            color={themeColors.PRIMARY}
            onPress={() => {
              mapRef.current.animateToRegion(
                {
                  ...userLocation,
                  latitudeDelta: 0.015,
                  longitudeDelta: 0.015,
                },
                1000,
              );
            }}
          />
        </View>
      </View>
      <BottomSheet
        ref={bottomSheetRef}
        index={0} // Start collapsed
        snapPoints={['38%']}
        handleComponent={() => null}
        handleIndicatorStyle={styles.handleIndicator}
        style={styles.bottomSheetStyle}>
        <OrderDetailBottomSheet total={total} />
      </BottomSheet>
    </GestureHandlerRootView>
  );
};

export default OrderTracking;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  map: {
    flex: 1,
  },
  mapWrap: {
    flex: 1,
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  currentLocation: {
    position: 'absolute',
    bottom: 300,
    right: 15,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: themeColors.WHITE,
    padding: 10,
    borderRadius: 10,
    shadowColor: themeColors.BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  bottomSheetStyle: {
    overflow: 'hidden',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
});
