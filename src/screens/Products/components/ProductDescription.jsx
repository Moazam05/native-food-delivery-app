import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

const ProductDescription = ({product}) => {
  console.log('product', product);

  return (
    <View style={styles.container}>
      <Text>ProductDescription</Text>
    </View>
  );
};

export default ProductDescription;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
  },
});
