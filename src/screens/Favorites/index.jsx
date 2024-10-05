import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Fonts} from '../../constants/fonts';
import {themeColors} from '../../constants/colors';
import {Back, Location, Star, WishlistFill} from '../../assets/images';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import useTypedSelector from '../../hooks/useTypedSelector';
import {
  selectWishlistProducts,
  setWishListProducts,
} from '../../redux/wishlist/wishlistsSlice';
import {thousandSeparator} from '../../utils';
import Toast from 'react-native-toast-message';

const Favorites = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const wishListProducts = useTypedSelector(selectWishlistProducts);

  // Function to remove item from wishlist
  const removeFromWishlist = item => {
    dispatch(setWishListProducts(item));
    Toast.show({
      type: 'favorites',
      text1: 'Removed from Favorites',
    });
  };

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.productCard}
        onPress={() => {
          navigation.navigate('ProductDetail', {item});
        }}>
        <Image source={item.image} style={styles.productImage} />
        <TouchableOpacity
          style={styles.wishlistWrap}
          onPress={() => removeFromWishlist(item)}>
          <Image source={WishlistFill} style={styles.wishlist} />
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

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor="transparent"
      />
      <View style={styles.wrap}>
        {/* Top Bar */}
        <View style={styles.topBar}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            <Image source={Back} style={styles.backIcon} />
          </TouchableOpacity>
          <Text style={styles.title}>Favorites</Text>
          <Text style={styles.h}>Hide</Text>
        </View>

        <View style={styles.flatWrap}>
          <FlatList
            data={wishListProducts}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
            numColumns={2} // Show 2 items per row
            columnWrapperStyle={styles.rowWrap} // Style to add space between items in a row
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.containerStyle}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Favorites;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeColors.PRIMARY_BG,
  },
  containerStyle: {
    paddingBottom: 130,
  },
  flatWrap: {
    marginTop: 20,
  },
  wrap: {
    marginHorizontal: 20,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  h: {
    opacity: 0,
  },
  productCard: {
    backgroundColor: themeColors.WHITE,
    borderRadius: 12,
    padding: 8,
    width: '48%',
    margin: '2%',
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
