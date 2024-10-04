import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

const CartSummary = () => {
  return (
    <View>
      <View style={styles.line} />
      <Text>Payment Summary</Text>
    </View>
  );
};

export default CartSummary;

const styles = StyleSheet.create({
  line: {
    height: 2,
    backgroundColor: '#EDEDED',
    marginVertical: 20,
  },
});
