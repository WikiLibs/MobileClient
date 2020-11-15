import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack'

import DrawerContents from './components/DrawerContents'

import AccountContainer from './components/Account/AccountContainer'
import HomeContainer from './components/Home/HomeContainer'
import SearchContainer from './components/Search/SearchContainer'
import TreeViewListContainer from './components/TreeViewList/TreeViewListContainer'
import ContactContainer from './components/Contact/ContactContainer'
import FAQContainer from './components/FAQ/FAQContainer'
import PrivacyPolicyContainer from './components/PrivacyPolicy/PrivacyPolicyContainer'
import TermsOfUseContainer from './components/TermsOfUse/TermsOfUseContainer'

import ApiService from './ApiService'

const Stack = createStackNavigator()

const Drawer = createDrawerNavigator();

global.api = new ApiService();

export default class App extends React.Component {
    render () {
        return (
            <NavigationContainer>
                <Drawer.Navigator drawerContent={props => <DrawerContents {...props} />}>
                    <Drawer.Screen name="Home" component={HomeContainer}/>
                    <Drawer.Screen name="Account" component={AccountContainer}/>
                    <Drawer.Screen name="Search" component={SearchContainer}/>
                    <Drawer.Screen name="Tree View List" component={TreeViewListContainer}/>
                    <Drawer.Screen name="Contact" component={ContactContainer}/>
                    <Drawer.Screen name="FAQ" component={FAQContainer}/>
                    <Drawer.Screen name="Privacy Policy" component={PrivacyPolicyContainer}/>
                    <Drawer.Screen name="Terms of Use" component={TermsOfUseContainer}/>
                </Drawer.Navigator>
            </NavigationContainer>
        )
    }
}