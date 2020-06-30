import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default class About extends React.Component {
  render() {
    return (
      <Button
          title="Go to home"
          onPress={() =>
            this.props.navigation.navigate('Home')
          }
        />
    );
  }
}