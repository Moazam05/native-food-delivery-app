import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Back} from '../assets/images';
import {Fonts} from '../constants/fonts';
import {themeColors} from '../constants/colors';

const Search = ({setSelectedTab}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => setSelectedTab(0)}>
          <Image source={Back} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.title}>Search Food</Text>
        <Text style={styles.hideText}>Hide</Text>
      </View>
    </SafeAreaView>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
});
