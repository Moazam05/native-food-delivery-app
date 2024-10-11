import {StyleSheet, Text, View} from 'react-native';
import React, {useRef} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import useTypedSelector from '../../hooks/useTypedSelector';
import {selectedAddress} from '../../redux/address/addressSlice';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';

const OrderTracking = () => {
  const mapRef = useRef();

  const getCurrentAddress = useTypedSelector(selectedAddress);

  console.log('getCurrentAddress', getCurrentAddress);

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <MapView
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}></MapView>
    </SafeAreaView>
  );
};

export default OrderTracking;

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
