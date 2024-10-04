import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Back, Delete, EmptyCart, Minus, Plus} from '../assets/images';
import {useNavigation} from '@react-navigation/native';
import {Fonts} from '../constants/fonts';
import {themeColors} from '../constants/colors';
import CustomButton from '../components/CustomButton';
import useTypedSelector from '../hooks/useTypedSelector';
import {selectedProducts} from '../redux/products/productsSlice';

const Cart = ({setSelectedTab}) => {
  const navigation = useNavigation();
  const cartProducts = useTypedSelector(selectedProducts);

  const renderProduct = ({item}) => (
    <View style={styles.productContainer}>
      <View
        style={{
          width: '30%',
          padding: 10,
        }}>
        <Image source={item.image} style={styles.productImage} />
      </View>
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>Rs. {item.price}</Text>

        <View style={styles.counterContainer}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 15,
            }}>
            <Image source={Minus} style={styles.counterIcon} />
            <Text style={styles.counterText}>1</Text>
            <Image source={Plus} style={styles.counterIcon} />
          </View>
          <Image source={Delete} style={styles.deleteIcon} />
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => setSelectedTab(0)}>
          <Image source={Back} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.title}>My Cart</Text>
        <Text style={styles.hideText}>Hide</Text>
      </View>

      <FlatList
        data={cartProducts}
        renderItem={renderProduct}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.flatListContainer}
        ListEmptyComponent={
          <View style={styles.emptyCartContainer}>
            <Image source={EmptyCart} style={styles.emptyCartIcon} />
            <View style={styles.cartTextContainer}>
              <Text style={styles.cartTitle}>Ouch! Hungry</Text>
              <Text style={styles.cartDescription}>
                Seems like you have not ordered
              </Text>
              <Text style={[styles.cartDescription, styles.cartDescriptionTwo]}>
                any food yet
              </Text>
            </View>
            <View style={styles.buttonContainer}>
              <CustomButton
                name="Find Food"
                onPress={() => setSelectedTab(0)}
              />
            </View>
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 20,
  },
  backIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 16,
    fontFamily: Fonts.SEMIBOLD,
    color: themeColors.BLACK,
  },
  hideText: {
    opacity: 0,
  },
  emptyCartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  emptyCartIcon: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  cartTextContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  cartTitle: {
    fontSize: 24,
    fontFamily: Fonts.BOLD,
    color: themeColors.BLACK,
  },
  cartDescription: {
    fontSize: 16,
    fontFamily: Fonts.REGULAR,
    color: themeColors.GRAY,
    marginTop: 15,
  },
  cartDescriptionTwo: {
    marginTop: 3,
  },
  buttonContainer: {
    marginTop: 50,
    width: '80%',
  },
  productContainer: {
    backgroundColor: themeColors.WHITE,
    borderRadius: 12,
    marginHorizontal: 20,
    marginTop: 20,
    flexDirection: 'row',
  },
  productImage: {
    width: 100,
    height: 90,
    resizeMode: 'cover',
    borderRadius: 12,
  },
  productInfo: {
    width: '68%',
    padding: 10,
    marginLeft: 10,
    flexDirection: 'column',
    alignItems: 'start',
    justifyContent: 'center',
  },
  productName: {
    fontFamily: Fonts.SEMIBOLD,
    fontSize: 16,
    color: themeColors.BLACK,
  },
  productPrice: {
    fontFamily: Fonts.BOLD,
    fontSize: 14,
    color: themeColors.PRIMARY,
    marginTop: 3,
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  counterIcon: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
  },
  counterText: {
    fontFamily: Fonts.BOLD,
    fontSize: 16,
    color: themeColors.BLACK,
  },
  deleteIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  flatListContainer: {
    paddingBottom: 20,
  },
});
