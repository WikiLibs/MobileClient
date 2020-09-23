import React, { Component } from 'react';
import {
    Switch,
    ScrollView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';
import Constants from 'expo-constants';
import * as Animatable from 'react-native-animatable';
import Collapsible from 'react-native-collapsible';
import Accordion from 'react-native-collapsible/Accordion';

const CONTENT = [
    {
        title: '+ What is WikiLibs ?',
        content: 'WikiLibs is a website regrouping programming library from different languages, with a unified design to enhance your learning.',
    },
    {
        title: '+ How does the website work ?',
        content: 'For a quickstart, just type the library you want in the search bar. You can also look for it in the sidebar in case you just want a look.\nAlso, you can contribute to the site in two ways. First, you can upload your own example for a symbol (like a function) to help other people. Second, you can upload a whole library to the site, using the Parsing Tool (see below). You should own the library and/or have the necessary permissions to do so.',
    },
    {
        title: '+ How to contact us ?',
        content: 'You have a question ? A feedback ? Just go to our contact page and check the different ways to contact us !',
    },
    {
        title: '+ I lost my password.',
        content: 'Please check the login page and follow the links.',
    }
];

export default class FAQ extends React.Component {
    state = {
        activeSections: [],
        collapsed: true,
        multipleSelect: false,
    };
    
    toggleExpanded = () => {
        this.setState({ collapsed: !this.state.collapsed });
    };
    
    setSections = sections => {
        this.setState({
            activeSections: sections.includes(undefined) ? [] : sections,
        });
    };
    
    renderHeader = (section, _, isActive) => {
        return (
            <Animatable.View
                duration={400}
                style={styles.header}
                transition="backgroundColor"
            >
                <Text style={styles.headerText}>{section.title}</Text>
            </Animatable.View>
        );
    };
    
    renderContent(section, _, isActive) {
        return (
            <View
                duration={100}
                style={styles.content}
                transition="backgroundColor"
            >
                <Text>{section.content}</Text>
            </View>
        );
      }
    
    render() {
        const { multipleSelect, activeSections } = this.state;
    
        return (
            <ScrollView style={{marginLeft: 20, marginRight: 20}}>
                    <Text style={styles.title}>FAQ</Text>
                    <Accordion
                        activeSections={activeSections}
                        sections={CONTENT}
                        touchableComponent={TouchableOpacity}
                        expandMultiple
                        renderHeader={this.renderHeader}
                        renderContent={this.renderContent}
                        duration={400}
                        onChange={this.setSections}
                    />
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    title: {
        color: "#4C3DA8",
        fontWeight: 'bold',
        fontSize: 30,
        marginTop: 40,
        marginBottom: 32
    },
    header: {
        marginBottom: 16
    },
    headerText: {
        fontSize: 16,
        color: '#4C3DA8',
        fontWeight: 'bold'
    },
    content: {
        marginBottom: 16,
        marginLeft: 16,
        marginRight: 16
    },
    selectors: {
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    selector: {
        backgroundColor: '#F5FCFF',
        padding: 10,
    },
    activeSelector: {
        fontWeight: 'bold',
    },
    selectTitle: {
        fontSize: 14,
        fontWeight: '500',
        padding: 10,
    },
    multipleToggle: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 30,
        alignItems: 'center',
    },
    multipleToggle__title: {
        fontSize: 16,
        marginRight: 8,
    },
});
