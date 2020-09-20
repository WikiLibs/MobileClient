import React from 'react'
import { Text, View, Button } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import FAQ from './FAQ'

const FAQStack = createStackNavigator()

export default function FAQContainer({ navigation }) {
    return (
        <FAQStack.Navigator
            initialRouteName="FAQ"
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
        <FAQStack.Screen
            name="FAQ"
            component={FAQ}
        />
    </FAQStack.Navigator>
  )
}