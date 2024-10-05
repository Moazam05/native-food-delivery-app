import React, {useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Back, ClearIcon, SearchIcon} from '../assets/images';
import {Fonts} from '../constants/fonts';
import {themeColors} from '../constants/colors';
import Categories from '../screens/Home/components/Categories';
import ProductList from '../screens/Home/components/ProductList';

const Search = ({setSelectedTab}) => {
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => setSelectedTab(0)}>
          <Image source={Back} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.title}>Search Food</Text>
        <Text style={styles.hideText}>Hide</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchBar}>
        <Image source={SearchIcon} style={styles.search} />
        <TextInput
          placeholder="Search Food"
          style={styles.searchInput}
          value={searchText}
          onChangeText={text => setSearchText(text)}
          placeholderTextColor="#BBBBBB"
        />
        {searchText.length > 0 && (
          <TouchableOpacity onPress={() => setSearchText('')}>
            <Image source={ClearIcon} style={styles.icon} />
          </TouchableOpacity>
        )}
      </View>

      <View>
        <Categories
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          showTitle={false}
        />
      </View>
      <View>
        <ProductList />
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

  searchBar: {
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 4,
    elevation: 3,
    height: 45,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    marginTop: 16,
    marginHorizontal: 20,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    paddingLeft: 15,
  },
  icon: {
    width: 20,
    height: 20,
    tintColor: themeColors.GRAY,
  },
  search: {
    width: 20,
    height: 20,
    tintColor: themeColors.GRAY,
  },
});
