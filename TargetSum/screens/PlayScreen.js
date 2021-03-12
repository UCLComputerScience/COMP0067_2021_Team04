// Aboutscreen.js
import React, { Component } from 'react';
import { Button, View, Text } from 'react-native';
import AppBar from '../src/components/AppBar';
import LandingPage from '../src/components/LandingPage'

const ContactsRoute = () => <Contacting />;

export default class PlayScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Button
          title="LETS PLAY!"
          onPress={() => this.props.navigation.navigate('LandingPage')}
/>
{/* <AppBar></AppBar> */}
      </View>
    )
  }
}