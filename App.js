import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack'

import DrawerContents from './components/DrawerContents'

import HomeContainer from './components/Home/HomeContainer'
import SearchContainer from './components/Search/SearchContainer'
import ContactContainer from './components/Contact/ContactContainer'
import FAQContainer from './components/FAQ/FAQContainer'
import PrivacyPolicyContainer from './components/PrivacyPolicy/PrivacyPolicyContainer'
import TermsOfUseContainer from './components/TermsOfUse/TermsOfUseContainer'

const Stack = createStackNavigator()

const Drawer = createDrawerNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Drawer.Navigator drawerContent={props => <DrawerContents {...props} />}>
                <Drawer.Screen name="Home" component={HomeContainer}/>
                <Drawer.Screen name="Search" component={SearchContainer}/>
                <Drawer.Screen name="Contact" component={ContactContainer}/>
                <Drawer.Screen name="FAQ" component={FAQContainer}/>
                <Drawer.Screen name="Privacy Policy" component={PrivacyPolicyContainer}/>
                <Drawer.Screen name="Terms of Use" component={TermsOfUseContainer}/>
            </Drawer.Navigator>
        </NavigationContainer>
    );
}