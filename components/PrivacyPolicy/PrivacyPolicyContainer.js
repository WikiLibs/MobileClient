import React from 'react'
import { Text, View, Button } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import PrivacyPolicy from './PrivacyPolicy'

const PrivacyPolicyStack = createStackNavigator()

export default function PrivacyPolicyContainer({ navigation }) {
    return (
        <PrivacyPolicyStack.Navigator
            initialRouteName="Privacy Policy"
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
        <PrivacyPolicyStack.Screen
            name="Privacy Policy"
            component={PrivacyPolicy}
        />
    </PrivacyPolicyStack.Navigator>
  )
}