// External Exports
import 'react-native-reanimated';
import { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Item } from 'react-navigation-header-buttons';

//Internal Exports
import CategoriesScreen from './screens/CategoriesScreen';
import CategoryMealsScreen from './screens/CategoryMealsScreen';
import MealDetailsScreen from './screens/MealDetailsScreen';
import FavoriteScreen from './screens/FavoriteScreen';
import FiltersScreen from './screens/FiltersScreen';
import Colors from './constants/Colors';
import { CustomHeaderButtons } from './components/HeaderButton';

// Initializations
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
SplashScreen.preventAutoHideAsync();
global.__reanimatedWorkletInit = () => {};

// Default Options for stack navigation
const defaultOptions = {
  title: 'Meals',
  headerStyle: {
    backgroundColor: Platform.OS == 'android' ? Colors.primaryColor : 'white',
  },
  headerTitleStyle: {
    fontFamily: 'open-sans-bold',
  },
  headerTintColor: Platform.OS === 'android' ? '#fff' : Colors.primaryColor,
};

// Main Stack
function Home() {
  return (
    <Stack.Navigator
      initialRouteName="Categories"
      screenOptions={defaultOptions}>
      <Stack.Screen
        name="Categories"
        component={CategoriesScreen}
        options={{
          title: 'Meal Categories',
          headerLeft: () => {
            return (
              <CustomHeaderButtons>
                <Item title="menu" iconName="ios-menu" />
              </CustomHeaderButtons>
            );
          },
        }}
      />
      <Stack.Screen
        name="CategoryMeals"
        component={CategoryMealsScreen}
        options={({ route }) => ({ title: route.params.title })}
      />
      <Stack.Screen
        name="MealDetails"
        component={MealDetailsScreen}
        options={({ route }) => ({
          title: route.params.title,
          headerRight: () => {
            return (
              <CustomHeaderButtons>
                <Item
                  title="favorite"
                  iconName="ios-star"
                  onPress={() => console.log('marked as fav')}
                />
              </CustomHeaderButtons>
            );
          },
        })}
      />
    </Stack.Navigator>
  );
}

// Favoirte Stack
function Favorites() {
  return (
    <Stack.Navigator
      initialRouteName="Favorites"
      screenOptions={defaultOptions}>
      <Stack.Screen
        name="Favorites"
        component={FavoriteScreen}
        options={{ headerTitle: 'Your Favorite Meals' }}
      />
      <Stack.Screen
        name="MealDetails"
        component={MealDetailsScreen}
        options={({ route }) => ({
          title: route.params.title,
          headerRight: () => {
            return (
              <CustomHeaderButtons>
                <Item
                  title="favorite"
                  iconName="ios-star"
                  onPress={() => console.log('marked as fav')}
                />
              </CustomHeaderButtons>
            );
          },
        })}
      />
    </Stack.Navigator>
  );
}

// ROOT
function Root() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        defaultOptions,
        tabBarIcon: ({ focused }) => {
          let iconName;
          if (route.name === 'Meals') {
            iconName = focused ? 'restaurant' : 'restaurant-outline';
          } else if (route.name === 'Favs') {
            iconName = focused ? 'ios-star' : 'ios-star-outline';
          }
          return (
            <Ionicons
              name={iconName}
              size={23}
              color={focused ? Colors.accentColor : 'grey'}
            />
          );
        },
        tabBarActiveTintColor: Colors.accentColor,
        tabBarInactiveTintColor: 'grey',
      })}>
      <Tab.Screen
        name="Meals"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Favs"
        component={Favorites}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}

// APP FUNCTION
export default function App() {
  const [dataLoaded, setDataLoaded] = useState(false);
  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({
          'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
          'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
        });
      } catch (e) {
        console.warn(e);
      } finally {
        setDataLoaded(true);
      }
    }
    prepare();
  }, []);
  const onLayoutRootView = useCallback(async () => {
    if (dataLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [dataLoaded]);

  if (!dataLoaded) {
    return null;
  }
  return (
    <NavigationContainer onLayout={onLayoutRootView} style={styles.container}>
      <Drawer.Navigator useLegacyImplementation initialRouteName="Home">
        <Drawer.Screen
          name="Home"
          component={Root}
          options={{ headerShown: false }}
        />
        <Drawer.Screen
          name="Filters"
          component={FiltersScreen}
          options={({navigation}) => ({
            ...defaultOptions,
            title: 'Filters',
            headerRight: () => {
              return (
                <CustomHeaderButtons>
                  <Item
                    title="save"
                    iconName="ios-save"
                    onPress={navigation.save}
                  />
                </CustomHeaderButtons>
              );
            },
          })}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
