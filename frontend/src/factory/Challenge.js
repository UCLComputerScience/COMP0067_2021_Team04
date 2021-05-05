import React, { Component } from 'react';
import { View } from 'react-native';
import Game from './Game';
import { StyleSheet } from 'react-native';
import SoloChallenge from './SoloChallenge';


export default class Challenge extends Component {
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
                <SoloChallenge
                key={this.state.gameId}
                onPlayAgain={this.resetGame} 
                randomNumberCount={5} 
                initialSeconds={10} 
                />
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
    }
  });