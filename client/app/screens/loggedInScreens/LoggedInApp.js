import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome5, FontAwesome  } from '@expo/vector-icons';

import ShoppingList from './ShoppingList';
import TaskLists from './TaskLists';
import { colorVars } from '../../../colors';

const Tab = createBottomTabNavigator();

export default function LoggedInApp() {
    return (
        <Tab.Navigator 
        screenOptions={{
            headerShown: false,
            tabBarActiveBackgroundColor: colorVars.background,
            tabBarInactiveBackgroundColor: colorVars.background,
        }} 
        initialRouteName='TaskLists'
        >
            <Tab.Screen 
                name="ShoppingList" 
                component={ShoppingList}
                options={{
                    tabBarLabel: "Groceries",
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome name="shopping-basket" size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen 
                name="TaskLists"
                component={TaskLists}
                options={{
                    tabBarLabel: "Tasks",
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome5 name="tasks" size={size} color={color} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}