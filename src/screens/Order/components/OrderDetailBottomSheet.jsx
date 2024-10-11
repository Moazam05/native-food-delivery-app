import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {themeColors} from '../../../constants/colors';
import {
  Phone,
  ProfileIcon,
  ProfileIconTwo,
  ProfileImg,
} from '../../../assets/images';
import {Fonts} from '../../../constants/fonts';

const OrderDetailBottomSheet = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: themeColors.BLACK,
      }}>
      <View
        style={{
          backgroundColor: themeColors.GRAY,
          width: 50,
          height: 5,
          borderRadius: 5,
          alignSelf: 'center',
          marginTop: 15,
        }}
      />

      <View
        style={{
          marginVertical: 25,
          backgroundColor: themeColors.WHITE,
          marginHorizontal: 20,
          borderRadius: 100,
          padding: 10,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 12,
            }}>
            <Image
              source={ProfileImg}
              style={{
                width: 43,
                height: 43,
                borderRadius: 50,
                resizeMode: 'contain',
              }}
            />
            <View>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: Fonts.SEMIBOLD,
                  color: themeColors.BLACK,
                }}>
                Salman Muazam
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: Fonts.REGULAR,
                  color: themeColors.GRAY,
                }}>
                Order ID: 123456
              </Text>
            </View>
          </View>
          <View>
            <Image
              source={Phone}
              style={{
                width: 40,
                height: 40,
                resizeMode: 'contain',
              }}
            />
          </View>
        </View>
      </View>

      <View
        style={{
          backgroundColor: themeColors.WHITE,
          height: '100%',
        }}>
        <Text>Hye</Text>
      </View>
    </View>
  );
};

export default OrderDetailBottomSheet;

const styles = StyleSheet.create({});
