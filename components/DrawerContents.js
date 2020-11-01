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
                    label="Account"
                    onPress={() => props.navigation.navigate("Account")}
                    icon={({color, size}) => (
                        <Icon 
                        name="account-circle-outline" 
                        color="#4C3DA8"
                        size={size}
                        />
                    )}
                />
                <View style={styles.separator}/>
                <DrawerItem
                    label="Home"
                    onPress={() => props.navigation.navigate("Home")}
                    icon={({color, size}) => (
                        <Icon 
                        name="home-outline" 
                        color="#4C3DA8"
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
                        color="#4C3DA8"
                        size={size}
                        />
                    )}
                />
                <DrawerItem
                    label="Tree View List"
                    onPress={() => props.navigation.navigate("Tree View List")}
                    icon={({color, size}) => (
                        <Icon 
                        name="file-tree" 
                        color="#4C3DA8"
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
                        color="#4C3DA8"
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
                        color="#4C3DA8"
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
                        color="#4C3DA8"
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
                        color="#4C3DA8"
                        size={size}
                        />
                    )}
                />
            </Drawer.Section>
        </View>
    );
}

const styles = StyleSheet.create({
    separator: {
        height: 2,
        backgroundColor: '#EBEBEB',
        margin: 10
    }
})