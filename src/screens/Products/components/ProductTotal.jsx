import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Fonts} from '../../../constants/fonts';
import {themeColors} from '../../../constants/colors';
import {thousandSeparator} from '../../../utils';
import CustomButton from '../../../components/CustomButton';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import useTypedSelector from '../../../hooks/useTypedSelector';
import {
  decrementProductQuantity,
  incrementProductQuantity,
  selectedProducts,
  setCartProducts,
} from '../../../redux/products/productsSlice';
import {CartTwo, Minus, Plus} from '../../../assets/images';

const ProductTotal = ({item}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const cartProducts = useTypedSelector(selectedProducts);

  const [productQuantity, setProductQuantity] = useState(0);
  const [isInCart, setIsInCart] = useState(false);

  useEffect(() => {
    const productInCart = cartProducts.find(product => product.id === item.id);
    if (productInCart) {
      setIsInCart(true);
      setProductQuantity(productInCart.quantity);
    } else {
      setIsInCart(false);
      setProductQuantity(0);
    }
  }, [cartProducts, item.id]);

  const calculateTotal = () => {
    return cartProducts
      .reduce((total, product) => total + product.price * product.quantity, 0)
      .toFixed(2);
  };

  const addToCartHandler = () => {
    dispatch(setCartProducts(item));
  };

  return (
    <View
      style={{
        width: '100%',
        height: 100,
        backgroundColor: themeColors.WHITE,
        paddingHorizontal: 24,
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginVertical: 10,
        }}>
        <Text
          style={{
            fontSize: 16,
            fontFamily: Fonts.BOLD,
            color: themeColors.BLACK,
            marginLeft: 10,
          }}>
          Total
        </Text>
        <Text
          style={{
            fontSize: 16,
            fontFamily: Fonts.BOLD,
            color: themeColors.PRIMARY,
            marginRight: 10,
          }}>
          Rs. {thousandSeparator(calculateTotal())}
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        {!isInCart && <View />}
        {isInCart && (
          <View style={styles.counterContainer}>
            <TouchableOpacity
              onPress={() => {
                dispatch(decrementProductQuantity(item.id));
              }}>
              <Image source={Minus} style={styles.addIcon} />
            </TouchableOpacity>

            <Text style={styles.quantityText}>{productQuantity}</Text>

            <TouchableOpacity
              onPress={() => {
                dispatch(incrementProductQuantity(item.id));
              }}>
              <Image source={Plus} style={styles.addIcon} />
            </TouchableOpacity>
          </View>
        )}
        <CustomButton
          name={isInCart ? 'Buy Now' : 'Add to Cart'}
          image={true}
          imageSrc={CartTwo}
          loginStyle={styles.buttonStyle}
          onPress={
            isInCart
              ? () => {
                  navigation.replace('HomeScreen', {screen: 'Cart'});
                }
              : addToCartHandler
          }
        />
      </View>
    </View>
  );
};

export default ProductTotal;

const styles = StyleSheet.create({
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
