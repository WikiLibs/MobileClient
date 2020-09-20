import * as React from 'react';
import { Text, StyleSheet, ScrollView, Linking } from 'react-native';

export default function Contact() {
    return (
        <ScrollView style={{marginLeft: 20, marginRight: 20}}>
            <Text style={styles.titles}>Contact</Text>
            <Text style={styles.mainContent}>Do you have any question that you can’t find answer in the FAQ ?</Text>
            <Text style={styles.mainContent}>Want to give some feedback on the website or suggest anything ?</Text>
            <Text style={styles.mainContent}>You are at the right place !</Text>

            <Text style={styles.titles}>Via email</Text>
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
    }
  })