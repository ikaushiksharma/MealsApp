import React from "react";
import { Text, View, StyleSheet, FlatList } from "react-native";
import MealItem from "../components/MealItem";
import { MEALS } from "../data/dummy-data";
const FavoriteScreen = (props) => {
  const renderMealItem = (itemData) => {
    return (
      <MealItem
        title={itemData.item.title}
        duration={itemData.item.duration}
        complexity={itemData.item.complexity}
        affordability={itemData.item.affordability}
        img={itemData.item.imageUrl}
        onSelectMeal={() => {
          props.navigation.navigate("MealDetails", {
            title: itemData.item.title,
            mealId: itemData.item.id,
          });
        }}
      />
    );
  };
  const displayedMeals = MEALS.filter((meal) => meal.id == "m1" || meal.id == "m2");
  return (
    <View style={styles.screen}>
      <FlatList data={displayedMeals} renderItem={renderMealItem} style={{ width: "100%" }} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
  },
});

export default FavoriteScreen;
