import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { StackActions } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import TreeViewList from './TreeViewList'
import TreeViewPage from '../TreeViewPage/TreeViewPage'
import TreeViewLibList from '../TreeViewLibList/TreeViewLibList'
import SymbolPage from '../SymbolPage/SymbolPage'
import LibInfo from '../LibInfo/LibInfo'

const TreeViewListStack = createStackNavigator()
const popAction = StackActions.pop(1)

export default function TreeViewListContainer({ navigation }) {
    return (
        <TreeViewListStack.Navigator
            initialRouteName="Tree View"
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
        <TreeViewListStack.Screen
            name="Language List"
            component={TreeViewList}
        />
        <TreeViewListStack.Screen
            name="TreeViewPage"
            component={TreeViewPage}
            options={{
                title: "Tree View",
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
        <TreeViewListStack.Screen
            name="TreeViewLibList"
            component={TreeViewLibList}
            options={{
                title: "Library List",
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
        <TreeViewListStack.Screen
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
        <TreeViewListStack.Screen
            name="LibInfo"
            component={LibInfo}
            options={{
                title: "Library informations",
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
    </TreeViewListStack.Navigator>
  )
}