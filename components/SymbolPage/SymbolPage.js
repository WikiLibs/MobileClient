import * as React from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper'
import CodeBox from './../../tools/CodeBox'

export default function SymbolPage(props) {
    return (
        <ScrollView style={{marginLeft: 20, marginRight: 20}}>
            <Text style={styles.titles}>symbol_type - symbol_name</Text>
            <Text style={styles.subtitle}>library_name</Text>
            <Text style={styles.subtitle}>Last updated: last_modification_date</Text>
            <Text style={styles.titles}>Prototype</Text>
            <CodeBox 
                code="symbol.prototype"
            />
            <Text style={styles.titles}>Description</Text>
            <Text style={styles.mainContent}>symbol.description</Text>
            <Text style={styles.titles}>Parameters</Text>
            <Text style={styles.parameter}>parameter_1</Text>
            <Text style={styles.parameterDescription}>parameter_1.description</Text>
            <View style={styles.separator} />
            <Text style={styles.parameter}>parameter_2</Text>
            <Text style={styles.parameterDescription}>parameter_2.description</Text>
            <Text style={styles.titles}>Example</Text>
            <Text style={styles.mainContent}>symbol.example.description</Text>
            <View style={styles.separatorSmall} />
            <CodeBox
                code="symbol.example.code"
            />
            <View style={styles.separatorBig} />
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
      fontSize: 24,
      marginTop: 40,
      marginBottom: 10
    },
    subtitle: {
        fontStyle: "italic",
        color: "#3E3E3E"
    },
    separator: {
        height: 16,
        opacity: 0
    },
    separatorSmall: {
        height: 8,
        opacity: 0
    },
    separatorBig: {
        height: 32,
        opacity: 0
    },
    mainContent: {
        marginLeft: 20,
        marginRight: 20
    },
    parameter: {
        marginLeft: 20,
        marginRight: 20,
        color: '#4C3DA8'
    },
    parameterDescription: {
        marginLeft: 40
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