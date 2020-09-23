import { View, Text, StyleSheet, ScrollView, ToastAndroid } from 'react-native'

export default function showToast (toastString) {
    ToastAndroid.show(toastString, ToastAndroid.SHORT);
}