import React from 'react';
import { Text, View, StyleSheet, ScrollView, Image } from 'react-native';
import { MEALS } from '../data/dummy-data';
import DefaultText from '../components/DefaultText';

const Li = (props) => {
  return (
    <View style={styles.listItem}>
      <DefaultText>{props.children}</DefaultText>
    </View>
  );
};
const MealDetailsScreen = (props) => {
  const { mealId } = props.route.params;
  const mealData = MEALS.find((item) => item.id == mealId);
  return (
    <ScrollView>
      <Image source={{ uri: mealData.imageUrl }} style={styles.image} />
      <View style={styles.details}>
        <DefaultText>{mealData.duration}m</DefaultText>
        <DefaultText>{mealData.complexity.toUpperCase()}</DefaultText>
        <DefaultText>{mealData.affordability.toUpperCase()}</DefaultText>
      </View>
      <Text style={styles.title}>ingredients</Text>
      {mealData.ingredients.map((ing, i) => (
        <Li key={i}>{ing}</Li>
      ))}
      <Text style={styles.title}>Steps</Text>
      {mealData.steps.map((step, i) => (
        <Li key={i}>{step}</Li>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 200,
  },
  details: {
    flexDirection: 'row',
    padding: 15,
    justifyContent: 'space-around',
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 22,
    textAlign: 'center',
  },
  listItem:{
    marginVertical:10,
    marginHorizontal:20,
    borderColor:'#ccc',
    borderWidth:1,
    padding:10
  }
});

export default MealDetailsScreen;
