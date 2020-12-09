import * as React from 'react'
import { ScrollView, View, Text, StyleSheet, ImageBackground, Image } from 'react-native'

export default class Home extends React.Component {
    renderHeader() {
        return (
            <ImageBackground source={require('../../resources/homepage_header_background.png')} style={styles.backgroundImage}>
                <View style={styles.headerContainer}>
                    <View style={styles.headerImageTextContainer}>
                        <Image source={require('../../resources/WikiLibs_Logo.png')} style={styles.headerImage} />
                        <View style={styles.headerTextContainer}>
                            <Text style={styles.headerTextTop}>WikiLibs,{"\n"}Our passion for your time</Text>
                            <Text style={styles.headerTextBottom}>Coding libraries won't be a problem anymore{"\n"}Start saving time now</Text>
                        </View>
                    </View>
                </View>
            </ImageBackground>
        )
    }

    renderBubble(image, text) {
        return (
            <View style={styles.bubbleContainer}>
                <Image source={image} style={styles.bubbleImage} />
                <Text style={styles.bubbleText}>{text}</Text>
            </View>
        )
    }

    renderMainContent() {
        return (
            <View>
                <Text style={styles.mainContentTitleText}>What is WikiLibs ?</Text>
                {this.renderBubble(require('../../resources/at_logo.png'), "WikiLibs regroups the documentation of\ncoding libraries, with a unified presentation")}
                {this.renderBubble(require('../../resources/people_logo.png'), "You can see and add custom examples to\nany symbol, for quicker understanding")}
                {this.renderBubble(require('../../resources/tools_logo.png'), "You can also access ressources like\ntutorials or installation guides")}
                <View style={{height: 100}}></View>
                <Text style={styles.mainContentTitleText}>How to use ?</Text>
                <View style={styles.mainContentGreyContainer}>
                    {this.renderBubble(require('../../resources/mouse_logo.png'), 'Press the header sandwich button to\nuse the application')}
                    {this.renderBubble(require('../../resources/search_logo.png'), 'You can also look for an existing\nsymbol or library')}
                    {this.renderBubble(require('../../resources/think_logo.png'), 'And add some of your own examples\nin a symbol page')}
                </View>
            </View>
        )
    }

    render() {
        return (
            <ScrollView>
                <View style={styles.header}>
                    {this.renderHeader()}
                </View>
                <View style={styles.mainContent}>
                    {this.renderMainContent()}
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    header: {
        height: 200,
        backgroundColor: 'black'
    },
    backgroundImage: {
        flex: 1
    },
    headerContainer: {
        height: 200,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    headerImageTextContainer: {
        display: 'flex',
        flexDirection: 'row',
        flexShrink: 1
    },
    headerTextContainer: {
        flex: 1,
        marginLeft: 32,
        marginRight: 16,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    headerTextTop: {
        color: 'white',
        fontStyle: 'italic',
        fontWeight: 'bold',
        fontSize: 21
    },
    headerTextBottom: {
        color: 'white',
        fontStyle: 'italic',
        fontWeight: 'bold',
        fontSize: 14,
        flex: 1
    },
    headerImage: {
        height: 100,
        width: 100,
        marginLeft: 16
    },
    mainContent: {
        margin: 32,
        marginTop: 64
    },
    mainContentTitleText: {
        color: '#4C3DA8',
        fontWeight: 'bold',
        fontSize: 26,
        textAlign: 'center',
        margin: 16
    },
    bubbleContainer: {
        height: 200,
        margin: 16,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    bubbleImage: {
        width: 150,
        height: 150
    },
    bubbleText: {
        color: '#4C3DA8',
        textAlign: 'center'
    },
    mainContentGreyContainer: {
        backgroundColor: '#EBEBEB'
    }
});