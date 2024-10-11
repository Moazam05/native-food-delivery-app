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
    <View style={styles.container}>
      <View style={styles.separator} />

      <View style={styles.infoCard}>
        <View style={styles.infoRow}>
          <View style={styles.profileInfo}>
            <Image source={ProfileImg} style={styles.profileImage} />
            <View>
              <Text style={styles.nameText}>Salman Muazam</Text>
              <Text style={styles.orderIdText}>Order ID: 123456</Text>
            </View>
          </View>
          <View style={styles.phoneIcon}>
            <Image source={Phone} style={styles.phoneImage} />
          </View>
        </View>
      </View>

      <View style={styles.bottomContent}>
        <Text>Hye</Text>
      </View>
    </View>
  );
};

export default OrderDetailBottomSheet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeColors.BLACK,
  },
  separator: {
    backgroundColor: themeColors.GRAY,
    width: 50,
    height: 5,
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: 15,
  },
  infoCard: {
    marginVertical: 25,
    backgroundColor: themeColors.WHITE,
    marginHorizontal: 20,
    borderRadius: 100,
    padding: 10,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  profileImage: {
    width: 43,
    height: 43,
    borderRadius: 50,
    resizeMode: 'contain',
  },
  nameText: {
    fontSize: 14,
    fontFamily: Fonts.SEMIBOLD,
    color: themeColors.BLACK,
  },
  orderIdText: {
    fontSize: 12,
    fontFamily: Fonts.REGULAR,
    color: themeColors.GRAY,
  },
  phoneIcon: {
    alignItems: 'flex-end',
  },
  phoneImage: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  bottomContent: {
    backgroundColor: themeColors.WHITE,
    height: '100%',
  },
});
