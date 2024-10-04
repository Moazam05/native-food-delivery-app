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
import {useRoute} from '@react-navigation/native';

const HomeScreen = () => {
  const route = useRoute();
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

  useEffect(() => {
    if (route.params?.screen === 'Cart') {
      setSelectedTab(1);
    }
  }, [route.params]);

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
          <Cart setSelectedTab={setSelectedTab} />
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

              <Text
                style={[styles.label, selectedTab === 0 && styles.activeLabel]}>
                Home
              </Text>
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
              <Text
                style={[styles.label, selectedTab === 1 && styles.activeLabel]}>
                Cart
              </Text>
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
              <Text
                style={[styles.label, selectedTab === 2 && styles.activeLabel]}>
                Search
              </Text>
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

              <Text
                style={[styles.label, selectedTab === 3 && styles.activeLabel]}>
                Account
              </Text>
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

  label: {
    fontSize: 11,
    fontFamily: Fonts.MEDIUM,
    color: themeColors.GRAY,
    marginTop: 2,
  },

  activeLabel: {
    color: themeColors.PRIMARY,
  },
});
