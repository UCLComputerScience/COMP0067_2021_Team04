// App.js
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'react-native';

import HomeScreen from './screens/HomeScreen';
import Contact from './screens/ContactScreen';
import PlayScreen from './screens/PlayScreen';
import TargetSumGame from './src/components/TargetSumGame';
import LandingPage from './src/components/LandingPage';
import Contacting from './screens/Contacting';
import Stats from './screens/StatsScreen';
import SetHomework from './screens/SetAssignments';
import Hub from './screens/HubScreen';
import BotBar from './src/components/BottomBar';
import LoginScreen from './screens/LoginScreen';



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

const AppContainer = NavigationContainer(AppNavigator);

export default App;