import React from 'react'
import { Text, View, Button } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import TermsOfUse from './TermsOfUse'

const TermsOfUseStack = createStackNavigator()

export default function TermsOfUseContainer({ navigation }) {
    return (
        <TermsOfUseStack.Navigator
            initialRouteName="Terms of Use"
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#7B68EE'
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
        <TermsOfUseStack.Screen
            name="Terms of Use"
            component={TermsOfUse}
        />
    </TermsOfUseStack.Navigator>
  )
}