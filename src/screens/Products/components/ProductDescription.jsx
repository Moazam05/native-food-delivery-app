import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {
  Burger,
  CoolDrink,
  Pizza,
  Star,
  Taco,
  TimeFill,
} from '../../../assets/images';
import {themeColors} from '../../../constants/colors';
import {Fonts} from '../../../constants/fonts';
import {thousandSeparator} from '../../../utils';

const ProductDescription = ({item}) => {
  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>{item?.name}</Text>
          <Image
            source={
              item?.type === 'Burger'
                ? Burger
                : item?.type === 'Taco'
                ? Taco
                : item?.type === 'Drink'
                ? CoolDrink
                : Pizza
            }
            style={styles.icon}
          />
        </View>
        <Text style={styles.price}>Rs. {thousandSeparator(item?.price)}</Text>

        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Rs.</Text>
            <Text>Free Delivery</Text>
          </View>
          <View style={styles.infoRow}>
            <Image source={TimeFill} style={styles.timeIcon} />
            <Text>{item?.distance}</Text>
          </View>
          <View style={styles.infoRow}>
            <Image source={Star} style={styles.timeIcon} />
            <Text>{item?.rating}</Text>
          </View>
        </View>

        <View style={styles.line} />

        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionTitle}>Description</Text>
          <Text style={styles.descriptionText}>{item?.description}</Text>
        </View>
      </View>
    </>
  );
};

export default ProductDescription;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 16,
  },
  title: {
    fontSize: 24,
    fontFamily: Fonts.SEMIBOLD,
    color: themeColors.BLACK,
  },
  icon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  price: {
    fontSize: 18,
    fontFamily: Fonts.BOLD,
    color: themeColors.PRIMARY,
    marginTop: 5,
  },
  infoCard: {
    backgroundColor: '#FFFAF5',
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  infoLabel: {
    fontSize: 14,
    fontFamily: Fonts.BOLD,
    color: themeColors.PRIMARY,
  },
  timeIcon: {
    width: 17,
    height: 17,
    resizeMode: 'contain',
    tintColor: themeColors.PRIMARY,
  },

  line: {
    height: 2,
    backgroundColor: '#EDEDED',
    marginVertical: 20,
  },
  descriptionContainer: {
    marginBottom: 16,
  },
  descriptionTitle: {
    fontSize: 16,
    fontFamily: Fonts.SEMIBOLD,
    color: themeColors.BLACK,
  },
  descriptionText: {
    fontSize: 14,
    fontFamily: Fonts.REGULAR,
    color: themeColors.GRAY,
    marginTop: 5,
  },
});
