import React, {useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  HelpIcon,
  Location,
  LogoutIcon,
  Orders,
  ProfileIconTwo,
  ProfileImg,
  RightArrow,
  Wishlist,
} from '../assets/images';
import CustomButton from '../components/CustomButton';
import {themeColors} from '../constants/colors';
import {Fonts} from '../constants/fonts';
import useTypedSelector from '../hooks/useTypedSelector';
import {selectedUser} from '../redux/auth/authSlice';
import SignOutModal from '../screens/Account/SignOutModal';
import {useNavigation} from '@react-navigation/native';
import Toast from 'react-native-toast-message';

const CardsData = [
  {
    id: 1,
    title: 'Orders',
    icon: Orders,
  },
  {
    id: 2,
    title: 'Favorites',
    icon: Wishlist,
  },
  {
    id: 3,
    title: 'Address',
    icon: Location,
  },
];

const Account = () => {
  const navigation = useNavigation();
  const loginUser = useTypedSelector(selectedUser);

  const [visible, setVisible] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Profile Settings</Text>

      <View style={styles.profileInfo}>
        <Image source={ProfileImg} style={styles.profileImage} />

        <Text style={styles.profileName}>{loginUser?.name}</Text>
        <Text style={styles.profileEmail}>{loginUser?.email}</Text>
      </View>

      <View style={styles.cardsContainer}>
        {CardsData.map(card => (
          <TouchableOpacity
            key={card.id}
            style={styles.card}
            onPress={() => {
              if (card.title === 'Favorites') {
                navigation.navigate('Favorites');
              } else if (card.title === 'Orders') {
                Toast.show({
                  type: 'favorites',
                  text1: 'Coming Soon...',
                });
              } else if (card.title === 'Address') {
                Toast.show({
                  type: 'favorites',
                  text1: 'Coming Soon...',
                });
              }
            }}>
            <Image source={card.icon} style={styles.cardIcon} />
            <Text style={styles.cardTitle}>{card.title}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.detailWrap}>
        <Text style={styles.detailTitle}>Profile</Text>

        <View style={styles.detailItem}>
          <View style={styles.detailItemLeft}>
            <Image source={ProfileIconTwo} style={styles.detailItemIcon} />
            <Text style={styles.detailItemText}>Personal Data</Text>
          </View>

          <TouchableOpacity
            style={styles.detailItemRight}
            onPress={() => navigation.navigate('ProfileDetail')}>
            <Image source={RightArrow} style={styles.detailItemArrow} />
          </TouchableOpacity>
        </View>

        <Text style={[styles.detailTitle, styles.detailTitleTwo]}>Support</Text>

        <View style={styles.detailItem}>
          <View style={styles.detailItemLeft}>
            <Image source={HelpIcon} style={styles.detailItemIcon} />
            <Text style={styles.detailItemText}>Help Center</Text>
          </View>

          <View style={styles.detailItemRight}>
            <Image source={RightArrow} style={styles.detailItemArrow} />
          </View>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <CustomButton
          name="Sign Out"
          image={true}
          imageSrc={LogoutIcon}
          loginStyle={styles.loginStyle}
          buttonStyle={styles.buttonStyle}
          onPress={() => setVisible(true)}
        />
      </View>

      {/* Modal */}
      <SignOutModal visible={visible} setVisible={setVisible} />
    </SafeAreaView>
  );
};

export default Account;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    textAlign: 'center',
    fontSize: 16,
    color: themeColors.BLACK,
    marginTop: 18,
  },
  profileInfo: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginTop: 40,
  },
  profileName: {
    fontSize: 16,
    marginTop: 16,
    color: themeColors.BLACK,
    fontFamily: Fonts.SEMIBOLD,
  },
  profileEmail: {
    fontSize: 14,
    color: themeColors.BLACK,
    fontFamily: Fonts.REGULAR,
  },
  cardsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: 30,
    alignItems: 'center',
  },
  card: {
    backgroundColor: themeColors.WHITE,
    padding: 10,
    borderRadius: 8,
    flexDirection: 'column',
    alignItems: 'center',
    width: 105,
    shadowColor: themeColors.BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardIcon: {
    width: 25,
    height: 25,
    tintColor: themeColors.GRAY,
  },
  cardTitle: {
    fontSize: 13,
    color: themeColors.BLACK,
    fontFamily: Fonts.REGULAR,
    marginTop: 5,
  },
  detailWrap: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  detailTitle: {
    fontSize: 12,
    fontFamily: Fonts.MEDIUM,
    color: themeColors.GRAY,
  },
  detailTitleTwo: {
    marginTop: 15,
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  detailItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  detailItemRight: {},
  detailItemIcon: {
    width: 27,
    height: 27,
    resizeMode: 'contain',
  },
  detailItemText: {
    fontSize: 14,
    fontFamily: Fonts.MEDIUM,
    color: themeColors.BLACK,
  },
  detailItemArrow: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  buttonContainer: {
    marginHorizontal: 30,
    marginTop: 50,
  },
  loginStyle: {
    backgroundColor: 'transparent',
    borderColor: '#E5E5E5',
    borderWidth: 1,
  },
  buttonStyle: {
    color: themeColors.ERROR,
    fontSize: 14,
    fontFamily: Fonts.SEMIBOLD,
  },
});
