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
          <TouchableOpacity onPress={() => setSelectedTab(0)}>
            <Image source={Back} style={styles.backIcon} />
          </TouchableOpacity>
          <Text style={styles.title}>My Cart</Text>
          <Text style={styles.hideText}>Hide</Text>
        </View>

        <View style={styles.emptyCartContainer}>
          <Image source={EmptyCart} style={styles.emptyCartIcon} />

          <View style={styles.cartTextContainer}>
            <Text style={styles.cartTitle}>Ouch! Hungry</Text>
            <Text style={styles.cartDescription}>
              Seems like you have not ordered
            </Text>
            <Text style={styles.cartDescription}>any food yet</Text>
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
  buttonContainer: {
    marginTop: 40,
    width: '80%',
  },
});
