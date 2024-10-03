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

const categoiesData = [
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

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text
          style={{
            fontSize: 16,
            fontFamily: Fonts.SEMIBOLD,
            color: themeColors.BLACK,
          }}>
          Find by Category
        </Text>
        <Text
          style={{
            fontSize: 14,
            fontFamily: Fonts.MEDIUM,
            color: themeColors.PRIMARY,
          }}>
          See All
        </Text>
      </View>

      <View>
        <FlatList
          data={categoiesData}
          keyExtractor={item => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => setSelectedCategory(item.name)}
              style={{
                paddingVertical: 10,
                paddingHorizontal: 16,
                borderRadius: 8,
                marginVertical: 16,
                marginRight: 20,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor:
                  selectedCategory === item.name
                    ? themeColors.PRIMARY
                    : themeColors.WHITE,
              }}>
              <Image
                source={item.image}
                style={{width: 31, height: 31, resizeMode: 'contain'}}
              />
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: Fonts.MEDIUM,
                  color:
                    selectedCategory === item.name
                      ? themeColors.WHITE
                      : themeColors.GRAY,
                  textAlign: 'center',
                  marginTop: 8,
                }}>
                {item.name}
              </Text>
            </TouchableOpacity>
          )}
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
});
