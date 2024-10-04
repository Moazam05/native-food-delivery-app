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

  console.log('cartProducts', cartProducts);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}>
        {/* Top Bar */}
        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => setSelectedTab(0)}>
            <Image source={Back} style={styles.backIcon} />
          </TouchableOpacity>
          <Text style={styles.title}>My Cart</Text>
          <Text style={styles.hideText}>Hide</Text>
        </View>

        <View
          style={{
            backgroundColor: themeColors.WHITE,
            borderRadius: 12,
            marginHorizontal: 20,
            marginTop: 20,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10,
            }}>
            <Image
              source={cartProducts[0]?.image}
              style={{
                width: '30%',
                height: 100,
                resizeMode: 'contain',
                borderTopLeftRadius: 12,
                borderTopRightRadius: 12,
              }}
            />
            <View
              style={{
                width: '65%',
              }}>
              <Text
                style={{
                  fontFamily: Fonts.SEMIBOLD,
                  fontSize: 16,
                  color: themeColors.BLACK,
                }}>
                Burger
              </Text>
              <Text
                style={{
                  fontFamily: Fonts.BOLD,
                  fontSize: 14,
                  color: themeColors.PRIMARY,
                  marginTop: 3,
                }}>
                Rs. 200
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginTop: 10,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 13,
                  }}>
                  <Image
                    source={Minus}
                    style={{
                      width: 25,
                      height: 25,
                      resizeMode: 'contain',
                    }}
                  />
                  <Text
                    style={{
                      fontFamily: Fonts.BOLD,
                      fontSize: 16,
                      color: themeColors.BLACK,
                    }}>
                    1
                  </Text>
                  <Image
                    source={Plus}
                    style={{
                      width: 25,
                      height: 25,
                      resizeMode: 'contain',
                    }}
                  />
                </View>
                <Image
                  source={Delete}
                  style={{
                    width: 20,
                    height: 20,
                    resizeMode: 'contain',
                  }}
                />
              </View>
            </View>
          </View>
        </View>

        {/* Empty Cart Code */}
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
            <CustomButton name="Find Food" onPress={() => setSelectedTab(0)} />
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
});
