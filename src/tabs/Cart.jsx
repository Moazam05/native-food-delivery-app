import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  Alert,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Back, Delete, EmptyCart, Minus, Plus} from '../assets/images';
import {useNavigation} from '@react-navigation/native';
import {Fonts} from '../constants/fonts';
import {themeColors} from '../constants/colors';
import CustomButton from '../components/CustomButton';
import useTypedSelector from '../hooks/useTypedSelector';
import {
  decrementProductQuantity,
  incrementProductQuantity,
  removeProduct,
  selectedProducts,
} from '../redux/products/productsSlice';
import {thousandSeparator} from '../utils';
import {useDispatch} from 'react-redux';
import CartSummary from '../screens/Cart/CartSummary';

const Cart = ({setSelectedTab}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const cartProducts = useTypedSelector(selectedProducts);

  const calculateTotal = () => {
    return cartProducts
      .reduce((total, product) => total + product.price * product.quantity, 0)
      .toFixed(2);
  };

  const handleRemoveProduct = id => {
    dispatch(removeProduct(id));
  };

  const renderProduct = ({item}) => (
    <View style={styles.productContainer}>
      <View style={styles.productImageContainer}>
        <Image source={item?.image} style={styles.productImage} />
      </View>
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item?.name}</Text>
        <Text style={styles.productPrice}>
          Rs. {thousandSeparator(item?.price)}
        </Text>

        <View style={styles.counterContainer}>
          <View style={styles.counterRow}>
            <TouchableOpacity
              onPress={() => dispatch(decrementProductQuantity(item.id))}>
              <Image source={Minus} style={styles.counterIcon} />
            </TouchableOpacity>

            <Text style={styles.counterText}>{item?.quantity}</Text>

            <TouchableOpacity
              onPress={() => dispatch(incrementProductQuantity(item.id))}>
              <Image source={Plus} style={styles.counterIcon} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={() => {
              Alert.alert(
                'Confirm deletion',
                'Are you sure you want to delete this product?',
                [
                  {
                    text: 'Cancel',
                    style: 'cancel',
                  },
                  {
                    text: 'OK',
                    onPress: () => handleRemoveProduct(item.id),
                  },
                ],
              );
            }}>
            <Image source={Delete} style={styles.deleteIcon} />
          </TouchableOpacity>
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

      <View style={styles.flatWrap}>
        <FlatList
          data={cartProducts}
          renderItem={renderProduct}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.flatListContainer}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyCartContainer}>
              <Image source={EmptyCart} style={styles.emptyCartIcon} />
              <View style={styles.cartTextContainer}>
                <Text style={styles.cartTitle}>Ouch! Hungry</Text>
                <Text style={styles.cartDescription}>
                  Seems like you have not ordered
                </Text>
                <Text
                  style={[styles.cartDescription, styles.cartDescriptionTwo]}>
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
          ListFooterComponent={<CartSummary setSelectedTab={setSelectedTab} />}
        />
      </View>
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
    marginBottom: 15,
    flexDirection: 'row',
  },
  productImageContainer: {
    width: '30%',
    padding: 10,
  },
  productImage: {
    width: 90,
    height: 85,
    resizeMode: 'cover',
    borderRadius: 12,
  },
  productInfo: {
    width: '70%',
    padding: 10,
    flexDirection: 'column',
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
  flatWrap: {
    marginTop: 20,
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 7,
  },
  counterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
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
    paddingBottom: 140,
  },
});
