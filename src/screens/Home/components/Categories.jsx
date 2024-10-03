import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {Fonts} from '../../../constants/fonts';
import {themeColors} from '../../../constants/colors';

const Categories = () => {
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
