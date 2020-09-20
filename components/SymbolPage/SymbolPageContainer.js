import React from 'react'
import { Text, View, Button } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import SymbolPage from './SymbolPage'

const SymbolPageStack = createStackNavigator()

export default function SymbolPageContainer({ navigation }) {
    return (
        <SymbolPageStack.Navigator
            initialRouteName="SymbolPage"
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
        <SymbolPageStack.Screen
            name="SymbolPage"
            component={SymbolPage}
        />
    </SymbolPageStack.Navigator>
  )
}