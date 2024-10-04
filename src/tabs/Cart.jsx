import React from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Back, EmptyCart} from '../assets/images';
import {useNavigation} from '@react-navigation/native';
import {Fonts} from '../constants/fonts';
import {themeColors} from '../constants/colors';
import CustomButton from '../components/CustomButton';

const Cart = ({setSelectedTab}) => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}>
        {/* Top Bar */}
        <View style={styles.topBar}>
          <TouchableOpacity
            onPress={() => {
              setSelectedTab(1);
            }}>
            <Image source={Back} style={styles.backIcon} />
          </TouchableOpacity>
          <Text style={styles.title}>My Cart</Text>
          <Text style={styles.h}>Hide</Text>
        </View>

        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 50,
          }}>
          <Image
            source={EmptyCart}
            style={{
              width: 200,
              height: 200,
              resizeMode: 'contain',
            }}
          />

          <View
            style={{
              marginTop: 50,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 24,
                fontFamily: Fonts.BOLD,
                color: themeColors.BLACK,
              }}>
              Ouch! Hungry
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontFamily: Fonts.REGULAR,
                color: themeColors.GRAY,
                marginTop: 15,
              }}>
              Seems like you have not ordered
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontFamily: Fonts.REGULAR,
                color: themeColors.GRAY,
                marginTop: 2,
              }}>
              any food yet
            </Text>
          </View>

          <View
            style={{
              marginTop: 40,
              width: '80%',
            }}>
            <CustomButton
              name="Find Food"
              onPress={() => {
                setSelectedTab(1);
              }}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    paddingBottom: 20,
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
});
