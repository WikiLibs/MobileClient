import React, { Component } from 'react';
import { AppRegistry, View } from 'react-native';
import Routes from './Routes.js'

class mobileClient extends Component {
   render() {
      return (
         <Routes />
      )
   }
}
export default mobileClient
AppRegistry.registerComponent('mobileClient', () => mobileClient)