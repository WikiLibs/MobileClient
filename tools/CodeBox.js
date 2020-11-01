import React from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import SyntaxHighlighter from 'react-native-syntax-highlighter'
import { solarizedLight } from 'react-syntax-highlighter/styles/hljs'

export default function CodeBox(props) {
    return (
        <View style={styles.codeBoxContainer}>
            <View style={styles.codeBox}>
                <SyntaxHighlighter 
                    language={props.language}
                    style={solarizedLight}
                    wrapLines
                >
                    {props.code}
                </SyntaxHighlighter>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    codeBoxContainer: {
        backgroundColor: "#EBEBEB",
        marginRight: 16,
        marginLeft: 16
    },
    codeBox: {
        margin: 16
    },
    updated: {
      fontStyle: "italic",
      color: "#3E3E3E",
      marginBottom: 20
    },
    titles: {
      color: "#4C3DA8",
      fontWeight: 'bold',
      fontSize: 24,
      marginTop: 40,
      marginBottom: 10
    },
    subtitle: {
        fontStyle: "italic",
        color: "#3E3E3E"
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
    separator: {
        height: 1,
        backgroundColor: '#EBEBEB',
        margin: 16
    }
  })