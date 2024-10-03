import {View, Text, Image, StyleSheet, FlatList} from 'react-native';
import React from 'react';
import {themeColors} from '../../../constants/colors';
import {Location, Star} from '../../../assets/images';
import {Fonts} from '../../../constants/fonts';
import {ProductsData} from '../../../constants';

const ProductList = () => {
  const renderItem = ({item}) => (
    <View style={styles.productCard}>
      <Image source={item.image} style={styles.productImage} />
      <Text style={styles.productTitle}>{item.name}</Text>

      <View style={styles.row}>
        <View style={styles.row}>
          <Image source={Star} style={styles.icon} />
          <Text style={styles.ratingText}>{item.rating}</Text>
        </View>
        <View style={styles.row}>
          <Image source={Location} style={styles.locationIcon} />
          <Text style={styles.distanceText}>{item.distance} m</Text>
        </View>
      </View>

      <Text style={styles.price}>Rs. {item.price}</Text>
    </View>
  );

  return (
    <FlatList
      data={ProductsData}
      renderItem={renderItem}
      keyExtractor={item => item.id.toString()}
      numColumns={2} // Show 2 items per row
      columnWrapperStyle={styles.rowWrap} // Style to add space between items in a row
      contentContainerStyle={styles.container}
    />
  );
};

export default ProductList;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    marginTop: 16,
  },
  rowWrap: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  productCard: {
    backgroundColor: themeColors.WHITE,
    borderRadius: 12,
    padding: 8,
    width: '48%',
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
    marginTop: 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
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
    marginTop: 5,
  },
});
