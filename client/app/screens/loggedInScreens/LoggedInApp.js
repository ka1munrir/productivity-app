import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import ShoppingList from './ShoppingList';

const Tab = createBottomTabNavigator();

export default function LoggedInApp() {
    return (
        <Tab.Navigator screenOptions={{headerShown: false}}>
            <Tab.Screen name="ShoppingList" component={ShoppingList} />
        </Tab.Navigator>
    );
}