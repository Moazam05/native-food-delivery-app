import {View, Text, Image} from 'react-native';
import React from 'react';
import {themeColors} from '../../../constants/colors';
import {
  Location,
  Product1,
  Star,
  Wishlist,
  WishlistFill,
} from '../../../assets/images';
import {Fonts} from '../../../constants/fonts';

const ProductList = () => {
  return (
    <View
      style={{
        marginHorizontal: 24,
        marginTop: 16,
      }}>
      <View
        style={{
          backgroundColor: themeColors.WHITE,
          borderRadius: 12,
          padding: 8,
          width: 155,
        }}>
        <Image
          source={Product1}
          style={{
            width: '100%',
            height: 120,
            borderRadius: 8,
            resizeMode: 'contain',
          }}
        />
        <Text
          style={{
            fontFamily: Fonts.MEDIUM,
            fontSize: 16,
            color: themeColors.BLACK,
            marginTop: 4,
          }}>
          Ordinary Burgers
        </Text>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 8,
            alignItems: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Image
              source={Star}
              style={{
                width: 16,
                height: 16,
                resizeMode: 'contain',
                marginRight: 4,
              }}
            />
            <Text
              style={{
                fontFamily: Fonts.MEDIUM,
                fontSize: 12,
                color: themeColors.BLACK,
              }}>
              4.5
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Image
              source={Location}
              style={{
                width: 16,
                height: 16,
                resizeMode: 'contain',
                marginRight: 4,
                tintColor: themeColors.PRIMARY,
              }}
            />
            <Text
              style={{
                fontFamily: Fonts.MEDIUM,
                fontSize: 12,
                color: themeColors.BLACK,
              }}>
              190m
            </Text>
          </View>
        </View>

        <View>
          <Text
            style={{
              fontFamily: Fonts.BOLD,
              fontSize: 16,
              color: themeColors.PRIMARY,
              marginTop: 8,
            }}>
            Rs. 200
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ProductList;
