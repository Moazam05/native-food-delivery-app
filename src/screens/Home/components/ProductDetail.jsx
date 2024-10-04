import {View, Text, StyleSheet, StatusBar} from 'react-native';
import React, {useRef} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {SafeAreaView} from 'react-native-safe-area-context';
import {themeColors} from '../../../constants/colors';

const ProductDetail = () => {
  const navigation = useNavigation();
  const swiperRef = useRef(null);
  const dispatch = useDispatch();
  const route = useRoute();
  const {item} = route.params || {};

  console.log('item', item);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor={themeColors.PRIMARY_BG}
      />
      <Text>ProductDetail</Text>
    </SafeAreaView>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeColors.PRIMARY_BG,
  },
});
