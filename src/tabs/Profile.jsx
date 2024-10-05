import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch} from 'react-redux';
import {selectedUser, setUser} from '../redux/auth/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {themeColors} from '../constants/colors';
import {
  HelpIcon,
  Location,
  Orders,
  ProfileIconTwo,
  ProfileImg,
  RightArrow,
  Wishlist,
} from '../assets/images';
import useTypedSelector from '../hooks/useTypedSelector';
import {Fonts} from '../constants/fonts';

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

const Profile = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const loginUser = useTypedSelector(selectedUser);

  console.log('loginUser', loginUser);

  const handleLogout = () => {
    Alert.alert(
      'Confirm Logout',
      'Are you sure you want to log out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          onPress: () => {
            dispatch(setUser(null));
            AsyncStorage.removeItem('user');
            navigation.navigate('Login');
          },
        },
      ],
      {cancelable: false},
    );
  };

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
          <View key={card.id} style={styles.card}>
            <Image source={card.icon} style={styles.cardIcon} />
            <Text style={styles.cardTitle}>{card.title}</Text>
          </View>
        ))}
      </View>

      <View style={styles.detailWrap}>
        <Text
          style={{
            fontSize: 12,
            fontFamily: Fonts.MEDIUM,
            color: themeColors.GRAY,
          }}>
          Profile
        </Text>

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
              marginTop: 10,
            }}>
            <Image
              source={ProfileIconTwo}
              style={{
                width: 27,
                height: 27,
                resizeMode: 'contain',
              }}
            />
            <Text
              style={{
                fontSize: 14,
                fontFamily: Fonts.MEDIUM,
                color: themeColors.BLACK,
              }}>
              Personal Data
            </Text>
          </View>

          <View>
            <Image
              source={RightArrow}
              style={{
                width: 20,
                height: 20,
                resizeMode: 'contain',
              }}
            />
          </View>
        </View>

        <Text
          style={{
            fontSize: 12,
            fontFamily: Fonts.MEDIUM,
            color: themeColors.GRAY,
            marginTop: 20,
          }}>
          Support
        </Text>

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
              marginTop: 10,
            }}>
            <Image
              source={HelpIcon}
              style={{
                width: 27,
                height: 27,
                resizeMode: 'contain',
              }}
            />
            <Text
              style={{
                fontSize: 14,
                fontFamily: Fonts.MEDIUM,
                color: themeColors.BLACK,
              }}>
              Help Center
            </Text>
          </View>

          <View>
            <Image
              source={RightArrow}
              style={{
                width: 20,
                height: 20,
                resizeMode: 'contain',
              }}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Profile;

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
    backgroundColor: themeColors.WHITE,
    padding: 20,
  },
});
