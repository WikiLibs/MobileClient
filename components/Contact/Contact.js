import * as React from 'react';
import { Text, StyleSheet, ScrollView, Linking, Image, TouchableOpacity } from 'react-native';
import * as WebBrowser from 'expo-web-browser';

export default function Contact() {
    const onPressUrl = (url) => {
        WebBrowser.openBrowserAsync(url)
    }

    return (
        <ScrollView style={{marginLeft: 20, marginRight: 20}}>
            <Text style={styles.titles}>Contact</Text>
            <Text style={styles.mainContent}>Do you have any question that you can’t find answer in the FAQ ?</Text>
            <Text style={styles.mainContent}>Want to give some feedback on the website or suggest anything ?</Text>
            <Text style={styles.mainContent}>You are at the right place !</Text>

            <Text style={styles.subContent}>Questions</Text>
            <Text 
                style={styles.mainContentLink}
                onPress={() => Linking.openURL('mailto:help@wikilibs.com')}
            >
                    help@wikilibs.com
            </Text>
            <Text style={styles.subContent}>Feedback and suggestions</Text>
            <Text
                style={styles.mainContentLink}
                onPress={() => Linking.openURL('mailto:feedback@wikilibs.com')}
            >
                feedback@wikilibs.com
            </Text>
            <Text style={styles.titles}>Stay in touch !</Text>
            <TouchableOpacity style={styles.socialContainer} onPress={() => {onPressUrl("https://discord.com/invite/3PG9tpNPzq")}}>
                <Image source={require('../../resources/discord_icon.png')} style={styles.image} />
                <Text style={{fontStyle: 'italic'}}>Discord</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialContainer} onPress={() => {onPressUrl("https://twitter.com/WikiLibs_/")}}>
                <Image source={require('../../resources/twitter_icon.png')} style={styles.image} />
                <Text style={{fontStyle: 'italic'}}>Twitter</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialContainer} onPress={() => {onPressUrl("https://www.linkedin.com/in/wikilibs-eip-48a5851b9/")}}>
                <Image source={require('../../resources/linkedin_icon.png')} style={styles.image} />
                <Text style={{fontStyle: 'italic'}}>Linkedin</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    updated: {
      fontStyle: "italic",
      color: "#3E3E3E",
      marginBottom: 20
    },
    titles: {
      color: "#4C3DA8",
      fontWeight: 'bold',
      fontSize: 30,
      marginTop: 40,
      marginBottom: 10
    },
    mainContent: {
        marginLeft: 20,
        marginRight: 20
    },
    mainContentLink: {
        marginLeft: 20,
        marginRight: 20,
        fontStyle: "italic",
        color: '#4C3DA8'
    },
    subContent: {
      color: "#4C3DA8",
      fontWeight: 'bold',
      fontSize: 16,
      marginBottom: 10,
      marginTop: 10
    },
    socialContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        margin: 16
    },
    image: {
        height: 32,
        width: 32,
        marginRight: 16
    }
  })