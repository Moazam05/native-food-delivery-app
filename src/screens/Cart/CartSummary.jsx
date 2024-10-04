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

  const calculateDiscount = () => {
    const total = parseFloat(calculateTotal());
    return (total * 0.1).toFixed(2);
  };

  const calculateTotalAfterDiscount = () => {
    return (
      parseFloat(calculateTotal()) - parseFloat(calculateDiscount())
    ).toFixed(2);
  };

  const calculateTotalItems = () => {
    return cartProducts.reduce((total, product) => total + product.quantity, 0);
  };

  return (
    <View style={styles.container}>
      <View style={styles.line} />
      <View style={styles.summaryContainer}>
        <Text style={styles.summaryTitle}>Payment Summary</Text>
        <View style={styles.summaryRow}>
          <Text style={styles.label}>
            Total Items ({calculateTotalItems()})
          </Text>
          <Text style={styles.value}>
            Rs. {thousandSeparator(calculateTotal())}
          </Text>
        </View>

        <View style={styles.summaryRow}>
          <Text style={styles.label}>Delivery Fee</Text>
          <Text style={styles.value}>Free</Text>
        </View>

        <View style={styles.summaryRow}>
          <Text style={styles.label}>Discount (10%)</Text>
          <Text style={styles.discountValue}>
            Rs. {thousandSeparator(calculateDiscount())}
          </Text>
        </View>

        <View style={styles.summaryRow}>
          <Text style={styles.label}>Total</Text>
          <Text style={styles.value}>
            Rs. {thousandSeparator(calculateTotalAfterDiscount())}
          </Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
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
  summaryContainer: {
    border: 1,
    borderColor: '#EDEDED',
    borderRadius: 10,
    padding: 10,
    borderWidth: 2,
  },
  summaryTitle: {
    fontSize: 16,
    fontFamily: Fonts.SEMIBOLD,
    color: themeColors.BLACK,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  label: {
    fontSize: 14,
    fontFamily: Fonts.MEDIUM,
    color: themeColors.GRAY,
  },
  value: {
    fontSize: 14,
    fontFamily: Fonts.BOLD,
    color: themeColors.BLACK,
  },
  discountValue: {
    fontSize: 14,
    fontFamily: Fonts.BOLD,
    color: themeColors.PRIMARY,
  },
  buttonContainer: {
    marginTop: 15,
  },
});
