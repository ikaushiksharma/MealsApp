import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  TouchableNativeFeedback,
  ImageBackground
} from 'react-native';

import DefaultText from './DefaultText'

const MealItem = (props) => {
  let TouchableCmp = TouchableOpacity;
  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

  return (
    <View style={styles.mealItem}>
      <TouchableCmp onPress={props.onSelectMeal}>
        <View>
          <View style={{ ...styles.mealRow, ...styles.mealHeader }}>
          <ImageBackground source={{uri:props.img}} style={styles.bgImg}>
            <Text style={styles.title} numberOfLines={1}>{props.title}</Text>
            </ImageBackground>
          </View>
          <View style={{ ...styles.mealRow, ...styles.mealDetail }}>
            <DefaultText>{props.duration}m</DefaultText>
            <DefaultText>{props.complexity.toUpperCase()}</DefaultText>
            <DefaultText>{props.affordability.toUpperCase()}</DefaultText>
          </View>
        </View>
      </TouchableCmp>
    </View>
  );
};
const styles = StyleSheet.create({
  mealItem: {
    height: 200,
    width: '100%',
    backgroundColor: '#f5f5f5',
    borderRadius:10,
    overflow:'hidden'
  },
  mealRow: {
    flexDirection: 'row',
  },
  mealHeader: {
    height: '85%',
  },
  mealDetail: {
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    alignItems:'center',
    height:'15%',
  },
  bgImg:{
    width:'100%',
    height:'100%',
    justifyContent:'flex-end'
  },
  title:{
    fontFamily:'open-sans-bold',
    fontSize:18,
    color:'white',
    backgroundColor:'rgba(0,0,0,0.5)',
    paddingHorizontal:12,
    paddingVertical:5,
    textAlign:'center'
  }
});

export default MealItem;