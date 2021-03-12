// Homescreen.js
import React, { Component } from 'react';
import { Button, View, Text } from 'react-native';
import { StyleSheet } from 'react-native';
import NavBar from '../src/components/NavBar';
import AppBar from '../src/components/AppBar';
import BotBar from '../src/components/BottomBar';


export default class Homescreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
    

<Text>Play Screen</Text>
          <Button
          title="Go to Play"
          onPress={() => this.props.navigation.navigate('Play')}
/>
<Text></Text>
<Text>Start App</Text>
          <Button
          title="Start App"
          onPress={() => this.props.navigation.navigate('Hub')}
/>
<Text></Text>
{/* <BotBar/> */}
      </View>
      {/* <AppBar></AppBar> */}
  

      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerContainer: {
    marginTop: 50,
    marginHorizontal: 10
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginTop: 35
  },
  extrabuttons: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
},
});