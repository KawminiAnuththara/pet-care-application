import { View, Text } from 'react-native'
import React from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../LoginScreen/HomeScreen';
import FavauriteScreen from '../LoginScreen/FavauriteScreen';
import ProfileScreen from '../LoginScreen/ProfileScreen';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../LoginScreen/utills/Colors';
import { FontAwesome5 } from '@expo/vector-icons';
import AppMapView from '../LoginScreen/AppMapView';
const Tab=createBottomTabNavigator();

export default function TabNavigation() {
  return (
    <Tab.Navigator screenOptions={{headerShown:false}}>
        <Tab.Screen name='Home' component={HomeScreen}
        options={{
          tabBarLabel:'Search',
          tabBarActiveTintColor:Colors.PRIMARY,
          tabBarIcon:({color,size})=>(
            <Ionicons name="search" size={size} color="color" />
          )
        }}
        />
        <Tab.Screen name='Favorite' component={FavauriteScreen}
        options={{
          tabBarLabel:'Favorite',
          tabBarActiveTintColor:Colors.PRIMARY,
          tabBarIcon:({color,size})=>(
            <FontAwesome5 name="heart" size={size} color="color" />
          )
        }}
        />
        <Tab.Screen name='Profile' component={ProfileScreen}
        options={{
          tabBarLabel:'Profile',
          tabBarActiveTintColor:Colors.PRIMARY,
          tabBarIcon:({color,size})=>(
            <FontAwesome5 name="user" size={size} color="color" />
          )
        }}
        />
    </Tab.Navigator>
  )
}