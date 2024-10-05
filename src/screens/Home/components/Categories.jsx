import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {Fonts} from '../../../constants/fonts';
import {themeColors} from '../../../constants/colors';
import {categoriesData} from '../../../constants';

const Categories = ({selectedCategory, setSelectedCategory, showTitle}) => {
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
    <View style={[styles.container, !showTitle && styles.containerTwo]}>
      {showTitle === false ? (
        ''
      ) : (
        <View style={styles.header}>
          <Text style={styles.headerText}>Find by Category</Text>
          <Text style={styles.seeAllText}>See All</Text>
        </View>
      )}

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
    marginTop: 24,
  },
  containerTwo: {
    marginTop: 9,
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
    paddingVertical: 7,
    paddingHorizontal: 14,
    borderRadius: 8,
    marginTop: 15,
    marginRight: 13,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: themeColors.WHITE,
  },
  selectedCategoryItem: {
    backgroundColor: themeColors.PRIMARY,
  },
  categoryImage: {
    width: 41,
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
