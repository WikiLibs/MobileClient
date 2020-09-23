import React from 'react'
import { View, Button, StyleSheet, TouchableOpacity, Text } from "react-native"
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

export default function CustomButton(props) {
    return (
        <TouchableOpacity 
            onPress={props.onClick} 
            style={props.isEnabled ? styles.appButtonContainerEnabled : styles.appButtonContainerDisabled} >
            <Icon name={props.icon} size={18} color="#fff" />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    appButtonContainerDisabled: {
      elevation: 8,
      backgroundColor: "#EBEBEB",
      borderRadius: 10,
      paddingVertical: 10,
      paddingHorizontal: 12,
      marginLeft: 8,
      marginRight: 8
    },
    appButtonContainerEnabled: {
        elevation: 8,
        backgroundColor: "#7B68EE",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12,
        marginLeft: 8,
        marginRight: 8
      },
    appButtonText: {
      fontSize: 18,
      color: "#fff",
      fontWeight: "bold",
      alignSelf: "center",
      textTransform: "uppercase"
    }
})