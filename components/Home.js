import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default class Home extends React.Component {
  render() {
    return (
      <Button
          title="Go to about"
          onPress={() =>
            this.props.navigation.navigate('About')
          }
        />
    );
  }
}