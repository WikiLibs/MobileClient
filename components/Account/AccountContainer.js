import React from 'react'
import { Text, View, Button } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import Account from './Account'

const AccountStack = createStackNavigator()

export default function AccountContainer({ navigation }) {
    return (
        <AccountStack.Navigator
            initialRouteName="Account"
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
        <AccountStack.Screen
            name="Account"
            component={Account}
        />
    </AccountStack.Navigator>
  )
}