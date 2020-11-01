import React from 'react'
import { Text, View, Button } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { StackActions } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import Search from './Search'
import SymbolPage from '../SymbolPage/SymbolPage'

const SearchStack = createStackNavigator()
const popAction = StackActions.pop(1)

export default function SearchContainer({ navigation }) {
    return (
        <SearchStack.Navigator
            initialRouteName="Search"
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#7B68EE',
                },
                headerTintColor: '#fff',
                headerLeft: () => (
                    <Icon 
                        name="menu"
                        size={25}
                        style={{marginStart: 15}}
                        color="#fff"
                        onPress={() => navigation.openDrawer()}
                    />
                )
            }}
        >
        <SearchStack.Screen
            name="Search"
            component={Search}
        />
        <SearchStack.Screen
            name="SymbolPage"
            component={SymbolPage}
            options={{
                title: "Symbol",
                headerLeft: () => (
                    <Icon 
                        name="arrow-left"
                        size={25}
                        style={{marginStart: 15}}
                        color="#fff"
                        onPress={() => navigation.dispatch(popAction)}
                    />
                )
            }}
        />
    </SearchStack.Navigator>
  )
}