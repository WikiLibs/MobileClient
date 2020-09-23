import React from 'react'
import { Text, View, Button } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import Home from './Home'

const HomeStack = createStackNavigator()

export default function HomeContainer({ navigation }) {
    return (
        <HomeStack.Navigator
            initialRouteName="Home"
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
                    onPress={() => navigation.openDrawer()}/>
            )
            }}
        >
        <HomeStack.Screen
            name="Home"
            component={Home}
            options={{
                title: "WikiLibs"
            }}
        />
    </HomeStack.Navigator>
  )
}