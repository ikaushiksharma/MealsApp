import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import {MEALS} from '../data/dummy-data';
const MealDetailsScreen = (props) => {
  const {mealId}=props.route.params;
  const mealData=MEALS.find(item=>item.id==mealId)
  return (
    <View style={styles.screen}>
      <Text>{mealData.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MealDetailsScreen;
