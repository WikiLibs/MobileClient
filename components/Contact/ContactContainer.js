import React from 'react'
import { Text, View, Button } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import Contact from './Contact'

const ContactStack = createStackNavigator()

export default function ContactContainer({ navigation }) {
    return (
        <ContactStack.Navigator
            initialRouteName="Contact"
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
        <ContactStack.Screen
            name="Contact"
            component={Contact}
        />
    </ContactStack.Navigator>
  )
}