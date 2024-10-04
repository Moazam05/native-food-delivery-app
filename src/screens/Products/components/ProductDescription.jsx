import {View, Text, StyleSheet, Image} from 'react-native';
import React, {useState} from 'react';
import {Fonts} from '../../../constants/fonts';
import {themeColors} from '../../../constants/colors';
import {
  Burger,
  CartTwo,
  CoolDrink,
  Minus,
  Pizza,
  Plus,
  Star,
  Taco,
  Time,
  TimeFill,
} from '../../../assets/images';
import {thousandSeparator} from '../../../utils';
import {useDispatch} from 'react-redux';
import {setCartProducts} from '../../../redux/products/productsSlice';
import CustomButton from '../../../components/CustomButton';

const ProductDescription = ({item}) => {
  const dispatch = useDispatch();

  const [isInCart, setIsInCart] = useState(false);
  const [productQuantity, setProductQuantity] = useState(0);

  const addToCartHandler = () => {
    dispatch(setCartProducts(item));
  };

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
      <View style={styles.bottomView}>
        <View style={styles.counterContainer}>
          <Image source={Minus} style={styles.addIcon} />
          <Text style={styles.quantityText}>{productQuantity}</Text>
          <Image source={Plus} style={styles.addIcon} />
        </View>
        <CustomButton
          name="Add to Cart"
          image={true}
          imageSrc={CartTwo}
          loginStyle={styles.buttonStyle}
        />
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

  bottomView: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 75,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: themeColors.WHITE,
    paddingHorizontal: 24,
    borderTopLeftRadius: 16,
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  addIcon: {
    width: 35,
    height: 35,
    resizeMode: 'contain',
  },
  quantityText: {
    fontSize: 16,
    fontFamily: Fonts.BOLD,
    color: themeColors.BLACK,
  },
  buttonStyle: {
    marginTop: 0,
    paddingHorizontal: 25,
  },
});
