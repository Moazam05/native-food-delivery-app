import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {Fonts} from '../../../constants/fonts';
import {themeColors} from '../../../constants/colors';
import {Burger, CoolDrink, Pizza, Taco} from '../../../assets/images';

const categoriesData = [
  {
    id: 1,
    name: 'Burger',
    image: Burger,
  },
  {
    id: 2,
    name: 'Taco',
    image: Taco,
  },
  {
    id: 3,
    name: 'Drink',
    image: CoolDrink,
  },
  {
    id: 4,
    name: 'Pizza',
    image: Pizza,
  },
];

const Categories = () => {
  const [selectedCategory, setSelectedCategory] = useState('');

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => setSelectedCategory(item.name)}
        style={[
          styles.categoryItem,
          selectedCategory === item.name && styles.selectedCategoryItem,
        ]}>
        <Image source={item.image} style={styles.categoryImage} />
        <Text
          style={[
            styles.categoryName,
            selectedCategory === item.name && styles.selectedCategoryName,
          ]}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Find by Category</Text>
        <Text style={styles.seeAllText}>See All</Text>
      </View>

      <View>
        <FlatList
          data={categoriesData}
          keyExtractor={item => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={renderItem}
        />
      </View>
    </View>
  );
};

export default Categories;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 24,
    marginVertical: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerText: {
    fontSize: 16,
    fontFamily: Fonts.SEMIBOLD,
    color: themeColors.BLACK,
  },
  seeAllText: {
    fontSize: 14,
    fontFamily: Fonts.MEDIUM,
    color: themeColors.PRIMARY,
  },
  categoryItem: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginVertical: 16,
    marginRight: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: themeColors.WHITE,
  },
  selectedCategoryItem: {
    backgroundColor: themeColors.PRIMARY,
  },
  categoryImage: {
    width: 31,
    height: 31,
    resizeMode: 'contain',
  },
  categoryName: {
    fontSize: 14,
    fontFamily: Fonts.MEDIUM,
    color: themeColors.GRAY,
    textAlign: 'center',
    marginTop: 8,
  },
  selectedCategoryName: {
    color: themeColors.WHITE,
  },
});
