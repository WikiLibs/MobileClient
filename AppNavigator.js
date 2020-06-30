import { createStackNavigator } from 'react-navigation-stack';
import Home from './components/Home';
import About from './components/About';

const AppNavigator = createStackNavigator({
  Home: { screen: Home },
  About: { screen: About },
});