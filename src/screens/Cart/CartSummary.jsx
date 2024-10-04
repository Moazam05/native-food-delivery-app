import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {themeColors} from '../../constants/colors';
import {Fonts} from '../../constants/fonts';
import CustomButton from '../../components/CustomButton';
import useTypedSelector from '../../hooks/useTypedSelector';
import {selectedProducts} from '../../redux/products/productsSlice';
import {thousandSeparator} from '../../utils';

const CartSummary = () => {
  const cartProducts = useTypedSelector(selectedProducts);

  const calculateTotal = () => {
    return cartProducts
      .reduce((total, product) => total + product.price * product.quantity, 0)
      .toFixed(2);
  };

  return (
    <View style={styles.container}>
      <View style={styles.line} />
      <View
        style={{
          border: 1,
          borderColor: '#EDEDED',
          borderRadius: 10,
          padding: 10,
          borderWidth: 2,
        }}>
        <Text
          style={{
            fontSize: 16,
            fontFamily: Fonts.SEMIBOLD,
            color: themeColors.BLACK,
          }}>
          Payment Summary
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 10,
          }}>
          <Text
            style={{
              fontSize: 14,
              fontFamily: Fonts.MEDIUM,
              color: themeColors.GRAY,
            }}>
            Total Items
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontFamily: Fonts.BOLD,
              color: themeColors.BLACK,
            }}>
            Rs. {thousandSeparator(calculateTotal())}
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 10,
          }}>
          <Text
            style={{
              fontSize: 14,
              fontFamily: Fonts.MEDIUM,
              color: themeColors.GRAY,
            }}>
            Delivery Fee
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontFamily: Fonts.BOLD,
              color: themeColors.BLACK,
            }}>
            Free
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 10,
          }}>
          <Text
            style={{
              fontSize: 14,
              fontFamily: Fonts.MEDIUM,
              color: themeColors.GRAY,
            }}>
            Discount
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontFamily: Fonts.BOLD,
              color: themeColors.PRIMARY,
            }}>
            10% (Rs. 450)
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 10,
          }}>
          <Text
            style={{
              fontSize: 14,
              fontFamily: Fonts.MEDIUM,
              color: themeColors.GRAY,
            }}>
            Total
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontFamily: Fonts.BOLD,
              color: themeColors.BLACK,
            }}>
            Rs. {thousandSeparator(calculateTotal())}
          </Text>
        </View>
      </View>
      <View
        style={{
          marginTop: 15,
        }}>
        <CustomButton name="Order Now" />
      </View>
    </View>
  );
};

export default CartSummary;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  line: {
    height: 2,
    backgroundColor: '#EDEDED',
    marginBottom: 25,
    marginTop: 10,
  },
});
