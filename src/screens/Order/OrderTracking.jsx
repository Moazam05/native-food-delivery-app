import {StyleSheet, Text, View} from 'react-native';
import React, {useRef, useEffect, useState, useCallback} from 'react';
import useTypedSelector from '../../hooks/useTypedSelector';
import {selectedAddress} from '../../redux/address/addressSlice';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {themeColors} from '../../constants/colors';
import GetLocation from 'react-native-get-location';

const OrderTracking = () => {
  const mapRef = useRef();

  const [userLocation, setUserLocation] = useState({
    latitude: 0,
    longitude: 0,
  });

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
          const coordinates = [newUserLocation];

          mapRef.current.fitToCoordinates(coordinates, {
            edgePadding: {top: 50, right: 50, bottom: 50, left: 50},
            animated: true,
          });
        }
      }
    } catch (error) {
      console.error('Error getting location:', error);
    }
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          ...userLocation,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        <Marker coordinate={userLocation} title="Current Location" />
      </MapView>
    </View>
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
});
