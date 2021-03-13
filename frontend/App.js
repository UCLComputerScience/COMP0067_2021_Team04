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


<Stack.Screen
  name="App"
  component={App}
  />

const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      >
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          />
        <Stack.Screen
          name="Home"
          component={Hub}
          />
      </Stack.Navigator>
  );
}

export default function App() {
  return <NavigationContainer> {AppNavigator}</NavigationContainer>
};