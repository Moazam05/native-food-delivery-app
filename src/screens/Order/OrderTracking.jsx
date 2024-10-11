import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import React, {useRef, useEffect, useState, useCallback} from 'react';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import GetLocation from 'react-native-get-location';
import BottomSheet from '@gorhom/bottom-sheet';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {themeColors} from '../../constants/colors';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import MapViewDirections from 'react-native-maps-directions';
import {GOOGLE_MAPS_API_KEY} from '@env';

const OrderTracking = () => {
  const mapRef = useRef();
  const bottomSheetRef = useRef(null);

  const [userLocation, setUserLocation] = useState({
    latitude: 0,
    longitude: 0,
  });

  const destination = {
    latitude: 31.523465385574074,
    longitude: 74.28969049388652,
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
          const coordinates = [
            {
              latitude: newUserLocation.latitude + 0.0025, // 225m north
              longitude: newUserLocation.longitude,
            },
            {
              latitude: newUserLocation.latitude - 0.0041, // 400m south
              longitude: newUserLocation.longitude,
            },
          ];

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

  // Bottom Sheet content
  const renderContent = () => (
    <View style={styles.bottomSheet}>
      <Text style={styles.sheetTitle}>Order Tracking Information</Text>
      <Text>Your current order is on the way!</Text>
      <TouchableOpacity onPress={() => bottomSheetRef.current?.collapse()}>
        <Text style={styles.closeButton}>Close</Text>
      </TouchableOpacity>
    </View>
  );

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

          <Marker coordinate={destination} pinColor={themeColors.PRIMARY} />

          {destination && (
            <MapViewDirections
              origin={userLocation}
              destination={destination}
              apikey={GOOGLE_MAPS_API_KEY}
              strokeWidth={3}
              strokeColor={themeColors.PRIMARY}
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
        snapPoints={['40%', '90%']} // Snap points for the bottom sheet
        // enablePanDownToClose={true}
      >
        {renderContent()}
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
  bottomSheet: {
    padding: 16,
    backgroundColor: 'white',
    height: '100%',
  },
  sheetTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeButton: {
    marginTop: 16,
    color: 'blue',
    textAlign: 'center',
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
});
