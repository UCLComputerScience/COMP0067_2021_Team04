// Aboutscreen.js
import React, { Component } from 'react';
import { Button, View, Text } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { StyleSheet } from 'react-native';
import ContactIcons from '../src/components/ContactIcons'

export default class Contact extends Component {
  state = {
    gameId: 1,
};
resetGame = () => {
    this.setState((prevState) => {
        return { gameId: prevState.gameId + 1};
    });
  };
    render() {
        return (
            <View style={styles.container}>
                <ContactIcons
                key={this.state.gameId}
                onPlayAgain={this.resetGame} 
                randomNumberCount={3} 
                initialSeconds={10} 
                />
            </View>
        );
    }
    }


//   render() {
//     return (
//       <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//         <Text>Contact Screen</Text>
//       </View>
//     )
//   }
// }

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
  }
});
