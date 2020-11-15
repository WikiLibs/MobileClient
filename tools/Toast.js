import { View, Text, StyleSheet, ScrollView, ToastAndroid, Platform } from 'react-native'

export default function showToast (toastString) {
    if (Platform.OS === 'android')
        ToastAndroid.show(toastString, ToastAndroid.SHORT);
}