// React Import
import React, {useEffect, useState} from 'react';
// React Native
import {
  View,
  Text,
  Keyboard,
  StatusBar,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from 'react-native';
// Constants
import {themeColors} from '../../constants/colors';
// Custom Components
import Home from '../../tabs/Home';
import Cart from '../../tabs/Cart';
import Search from '../../tabs/Search';
import Profile from '../../tabs/Profile';
import {Fonts} from '../../constants/fonts';
// Assets
import {CartIcon, HomeIcon, ProfileIcon, SearchIcon} from '../../assets/images';

const HomeScreen = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => setIsKeyboardVisible(true),
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => setIsKeyboardVisible(false),
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor={themeColors.PRIMARY_BG}
      />
      <SafeAreaView style={styles.container}>
        {selectedTab === 0 ? (
          <Home />
        ) : selectedTab === 1 ? (
          <Cart />
        ) : selectedTab === 2 ? (
          <Search />
        ) : (
          <Profile />
        )}

        {!isKeyboardVisible && (
          <View style={styles.bottomView}>
            <TouchableOpacity
              style={styles.bottomTab}
              onPress={() => setSelectedTab(0)}>
              <Image
                source={HomeIcon}
                style={[
                  styles.bottomTabIcon,
                  selectedTab === 0 && styles.activeBottomTabIcon,
                ]}
              />

              {selectedTab === 0 && (
                <Text style={styles.activeLabel}>Home</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.bottomTab}
              onPress={() => setSelectedTab(1)}>
              <Image
                source={CartIcon}
                style={[
                  styles.bottomTabIcon,
                  selectedTab === 1 && styles.activeBottomTabIcon,
                ]}
              />
              {selectedTab === 1 && (
                <Text style={styles.activeLabel}>Cart</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.bottomTab}
              onPress={() => setSelectedTab(2)}>
              <Image
                source={SearchIcon}
                style={[
                  styles.bottomTabIcon,
                  selectedTab === 2 && styles.activeBottomTabIcon,
                ]}
              />
              {selectedTab === 2 && (
                <Text style={styles.activeLabel}>Search</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.bottomTab}
              onPress={() => setSelectedTab(3)}>
              <Image
                source={ProfileIcon}
                style={[
                  styles.bottomTabIcon,
                  selectedTab === 3 && styles.activeBottomTabIcon,
                ]}
              />

              {selectedTab === 3 && (
                <Text style={styles.activeLabel}>Profile</Text>
              )}
            </TouchableOpacity>
          </View>
        )}
      </SafeAreaView>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeColors.PRIMARY_BG,
  },
  bottomView: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 65,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: themeColors.WHITE,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  bottomTab: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomTabIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    tintColor: '#C2C2C2',
  },
  activeBottomTabIcon: {
    tintColor: themeColors.PRIMARY,
  },
  activeLabel: {
    fontSize: 12,
    color: themeColors.PRIMARY,
    fontFamily: Fonts.MEDIUM,
  },

  cartContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -25,
    right: 10,
    backgroundColor: '#EB3030',
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    fontSize: 10,
    color: themeColors.WHITE,
    fontFamily: Fonts.REGULAR,
  },
  activeBadge: {
    backgroundColor: themeColors.WHITE,
    borderWidth: 1,
    borderColor: '#EB3030',
  },
  activeBadgeText: {
    color: '#EB3030',
    fontSize: 10,
  },
  cartTab: {
    backgroundColor: themeColors.WHITE,
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    top: -25,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  activeCartTab: {
    backgroundColor: '#EB3030',
  },
  lastActiveBottomTabIcon: {
    width: 19,
    height: 24,
    resizeMode: 'contain',
    tintColor: themeColors.WHITE,
  },
});
