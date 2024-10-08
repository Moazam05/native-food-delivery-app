import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {themeColors} from '../../../constants/colors';
import {Location, Star, Wishlist, WishlistFill} from '../../../assets/images';
import {Fonts} from '../../../constants/fonts';
import {ProductsData} from '../../../constants';
import {useDispatch} from 'react-redux';
import useTypedSelector from '../../../hooks/useTypedSelector';
import {
  selectWishlistProducts,
  setWishListProducts,
} from '../../../redux/wishlist/wishlistsSlice';
import {thousandSeparator} from '../../../utils';
import Toast from 'react-native-toast-message';
import {useNavigation} from '@react-navigation/native';

const ProductList = ({selectedCategory, searchText}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const wishListProducts = useTypedSelector(selectWishlistProducts);

  const [filteredProducts, setFilteredProducts] = useState(ProductsData);

  const renderItem = ({item}) => {
    const isFavorite = wishListProducts.some(product => product.id === item.id);

    return (
      <TouchableOpacity
        style={styles.productCard}
        onPress={() => {
          navigation.navigate('ProductDetail', {item});
        }}>
        <Image source={item.image} style={styles.productImage} />
        <TouchableOpacity
          style={styles.wishlistWrap}
          onPress={() => {
            dispatch(setWishListProducts(item));
            Toast.show({
              type: 'favorites',
              text1: isFavorite
                ? 'Removed from Favorites'
                : 'Added to Favorites',
              position: 'bottom',
            });
          }}>
          <Image
            source={isFavorite ? WishlistFill : Wishlist}
            style={styles.wishlist}
          />
        </TouchableOpacity>
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

        <Text style={styles.price}>Rs. {thousandSeparator(item.price)}</Text>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    if (selectedCategory && searchText) {
      setFilteredProducts(
        ProductsData.filter(
          product =>
            product.type === selectedCategory &&
            product.name.toLowerCase().includes(searchText.toLowerCase()),
        ),
      );
    } else if (selectedCategory) {
      setFilteredProducts(
        ProductsData.filter(product => product.type === selectedCategory),
      );
    } else if (searchText) {
      setFilteredProducts(
        ProductsData.filter(product =>
          product.name.toLowerCase().includes(searchText.toLowerCase()),
        ),
      );
    } else {
      setFilteredProducts(ProductsData);
    }
  }, [selectedCategory, searchText]);

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredProducts}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        numColumns={2} // Show 2 items per row
        columnWrapperStyle={styles.rowWrap} // Style to add space between items in a row
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.containerStyle}
      />
    </View>
  );
};

export default ProductList;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    marginTop: 16,
  },
  containerStyle: {
    paddingBottom: 280,
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
    resizeMode: 'cover',
    position: 'relative',
  },
  wishlistWrap: {
    position: 'absolute',
    top: 15,
    right: 15,
    backgroundColor: themeColors.WHITE,
    padding: 6,
    borderRadius: 50,
  },
  wishlist: {
    width: 15,
    height: 15,
    resizeMode: 'contain',
    tintColor: themeColors.ERROR,
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
