import React from 'react'
import { View, StyleSheet } from 'react-native'
import {
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem
} from '@react-navigation/drawer'
import {
    Avatar,
    Caption,
    Drawer,
    Paragraph,
    Text,
    Title,
    TouchableRipple,
    Switch
} from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

export default function DrawerContents (props) {
    return (
        <View style={{flex: 1}}>
            <DrawerContentScrollView {...props}>
                <DrawerItem
                    label="Home"
                    onPress={() => props.navigation.navigate("Home")}
                    icon={({color, size}) => (
                        <Icon 
                        name="home" 
                        color={color}
                        size={size}
                        />
                    )}
                />
                <DrawerItem
                    label="Search"
                    onPress={() => props.navigation.navigate("Search")}
                    icon={({color, size}) => (
                        <Icon 
                        name="magnify" 
                        color={color}
                        size={size}
                        />
                    )}
                />
            </DrawerContentScrollView>
            <Drawer.Section style={{marginBottom: 15}}>
                <DrawerItem
                    label="Contact"
                    onPress={() => props.navigation.navigate("Contact")}
                    icon={({color, size}) => (
                        <Icon 
                        name="at" 
                        color={color}
                        size={size}
                        />
                    )}
                />
                <DrawerItem
                    label="FAQ"
                    onPress={() => props.navigation.navigate("FAQ")}
                    icon={({color, size}) => (
                        <Icon 
                        name="help-circle-outline" 
                        color={color}
                        size={size}
                        />
                    )}
                />
                <DrawerItem
                    label="Privacy Policy"
                    onPress={() => props.navigation.navigate("Privacy Policy")}
                    icon={({color, size}) => (
                        <Icon 
                        name="ballot-outline" 
                        color={color}
                        size={size}
                        />
                    )}
                />
                <DrawerItem
                    label="Terms of Use"
                    onPress={() => props.navigation.navigate("Terms of Use")}
                    icon={({color, size}) => (
                        <Icon 
                        name="ballot-outline" 
                        color={color}
                        size={size}
                        />
                    )}
                />
            </Drawer.Section>
        </View>
    );
}