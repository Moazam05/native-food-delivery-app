import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {SafeAreaView} from 'react-native-safe-area-context';
import {themeColors} from '../../../constants/colors';
import {Back, Wishlist, WishlistFill} from '../../../assets/images';
import {Fonts} from '../../../constants/fonts';
import Swiper from 'react-native-swiper';
import {imagesData} from '../../../constants';
import useTypedSelector from '../../../hooks/useTypedSelector';
import {
  selectWishlistProducts,
  setWishListProducts,
} from '../../../redux/wishlist/wishlistsSlice';

const ProductDetail = () => {
  const navigation = useNavigation();
  const swiperRef = useRef(null);
  const dispatch = useDispatch();
  const route = useRoute();
  const {item} = route.params || {};
  const wishListProducts = useTypedSelector(selectWishlistProducts);

  const [activeIndex, setActiveIndex] = useState(0);
  const [productImages, setProductImages] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);

  console.log('item', item);
  console.log('productImages', productImages);

  useEffect(() => {
    const findImages = imagesData.find(pr => pr.linkId === item.linkId);
    if (findImages) {
      setProductImages(findImages.images);
    }

    const findFavorite = wishListProducts.some(
      product => product.id === item.id,
    );
    setIsFavorite(findFavorite);
  }, [item]);

  const toggleFavorite = () => {
    setIsFavorite(prev => !prev);
    dispatch(setWishListProducts(item));
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor={themeColors.PRIMARY_BG}
      />
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Image source={Back} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.title}>About This Menu</Text>
        <Text style={styles.h}>Hide</Text>
      </View>

      <View
        style={{
          height: 300,
          justifyContent: 'center',
          width: '100%',
          position: 'relative',
          marginTop: 10,
        }}>
        <Swiper
          ref={swiperRef}
          loop={false}
          onIndexChanged={index => setActiveIndex(index)}
          showsPagination={false}>
          {productImages.map((image, index) => (
            <View key={index} style={styles.banner}>
              <Image source={image} style={styles.bannerImg} />
            </View>
          ))}
        </Swiper>

        <TouchableOpacity style={styles.wishWrap} onPress={toggleFavorite}>
          <Image
            source={isFavorite ? WishlistFill : Wishlist}
            style={styles.wishlistIcon}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeColors.PRIMARY_BG,
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
  h: {
    opacity: 0,
  },
  banner: {
    marginHorizontal: 16,
    marginVertical: 16,
    position: 'relative',
  },
  bannerImg: {
    borderRadius: 12,
    width: '100%',
    height: 250,
    resizeMode: 'cover',
  },
  wishWrap: {
    position: 'absolute',
    top: 25,
    right: 25,
    backgroundColor: '#F9F9F9',
    padding: 8,
    borderRadius: 50,
  },
  wishlistIcon: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
    tintColor: themeColors.ERROR,
  },
});
