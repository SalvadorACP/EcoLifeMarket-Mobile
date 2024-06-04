import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import ProductsScreen from '../screens/ProductsScreen';
import ProductDetailsScreen from '../screens/ProductDetailsScreen';
import AddProductScreen from '../screens/AddProductScreen';
import EditProductScreen from '../screens/EditProductScreen';
import { RootStackParamList } from './navigationTypes';

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

const ProductsStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Products" component={ProductsScreen} />
    <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} />
    <Stack.Screen name="EditProduct" component={EditProductScreen} />
  </Stack.Navigator>
);

const AppNavigator = () => (
  <NavigationContainer>
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Product" component={ProductsStack} />
      <Tab.Screen name="Add Product" component={AddProductScreen} />
    </Tab.Navigator>
  </NavigationContainer>
);

export default AppNavigator;
