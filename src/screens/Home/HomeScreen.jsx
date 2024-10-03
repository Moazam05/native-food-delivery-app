import {
  View,
  Text,
  Keyboard,
  StatusBar,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {themeColors} from '../../constants/colors';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Home from '../../tabs/Home';
import Cart from '../../tabs/Cart';
import Search from '../../tabs/Search';
import Profile from '../../tabs/Profile';

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
        barStyle="light-content"
        translucent
        backgroundColor={themeColors.PRIMARY_BG}
      />
      <SafeAreaView style={styles.container}>
        {selectedTab === 0 ? (
          <Home setSelectedTab={setSelectedTab} />
        ) : selectedTab === 1 ? (
          <Cart setSelectedTab={setSelectedTab} />
        ) : selectedTab === 2 ? (
          <Search />
        ) : (
          <Profile />
        )}
      </SafeAreaView>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.PRIMARY_BG,
  },
});
