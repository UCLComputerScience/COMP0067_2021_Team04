// App.js
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { StatusBar } from 'react-native';

import HomeScreen from '../../screens/HomeScreen';
import Contact from '../../screens/ContactScreen';
import PlayScreen from '../../screens/PlayScreen';
import TargetSumGame from './TargetSumGame';
import LandingPage from './LandingPage';
import Contacting from '../../screens/Contacting';
import Stats from '../../screens/StatsScreen';
import SetHomework from '../../screens/SetAssignments';
import Hub from '../../screens/HubScreen';
import BotBar from '../components/BottomBar';
import LoginScreen from '../../screens/LoginScreen';

class App extends React.Component {
  render() {
    return <AppContainer />
  }
}

const AppNavigator = createStackNavigator({
  Login: {
    screen: LoginScreen
  },
  Home: {
    screen: Hub
  },
  PlayScreen: {
    screen: PlayScreen
},
  Game: {
    screen: TargetSumGame
  },
});

const AppContainer = createAppContainer(AppNavigator);

export default App;