import {View, Text, Image, StyleSheet} from 'react-native';
import React from 'react';
import {themeColors} from '../../../constants/colors';
import {Location, Product1, Star} from '../../../assets/images';
import {Fonts} from '../../../constants/fonts';

const ProductList = () => {
  return (
    <View style={styles.container}>
      <View style={styles.productCard}>
        <Image source={Product1} style={styles.productImage} />
        <Text style={styles.productTitle}>Ordinary Burgers</Text>

        <View style={styles.row}>
          <View style={styles.row}>
            <Image source={Star} style={styles.icon} />
            <Text style={styles.ratingText}>4.5</Text>
          </View>
          <View style={styles.row}>
            <Image source={Location} style={styles.locationIcon} />
            <Text style={styles.distanceText}>190m</Text>
          </View>
        </View>

        <Text style={styles.price}>Rs. 200</Text>
      </View>
    </View>
  );
};

export default ProductList;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 24,
    marginTop: 16,
  },
  productCard: {
    backgroundColor: themeColors.WHITE,
    borderRadius: 12,
    padding: 8,
    width: 155,
  },
  productImage: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    resizeMode: 'contain',
  },
  productTitle: {
    fontFamily: Fonts.MEDIUM,
    fontSize: 16,
    color: themeColors.BLACK,
    marginTop: 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  icon: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
    marginRight: 4,
  },
  locationIcon: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
    marginRight: 4,
    tintColor: themeColors.PRIMARY,
  },
  ratingText: {
    fontFamily: Fonts.MEDIUM,
    fontSize: 12,
    color: themeColors.BLACK,
  },
  distanceText: {
    fontFamily: Fonts.MEDIUM,
    fontSize: 12,
    color: themeColors.BLACK,
  },
  price: {
    fontFamily: Fonts.BOLD,
    fontSize: 16,
    color: themeColors.PRIMARY,
    marginTop: 8,
  },
});
