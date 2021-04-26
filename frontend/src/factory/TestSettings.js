import React, { Component } from 'react';
import TypeGame from './TypeGame';
import { StyleSheet, View } from 'react-native';

export default class TestSettings extends Component {

    state = {
        gameId: 1,
    };
    inTest = {
        testId: 1,
    };
    resetGame = () => {
        this.setState((prevState) => {
            return { gameId: prevState.gameId + 1};
        });
    };
    nextQuestion = () => {
        this.inTest((prevState) => {
            return { testId: prevState.testId + 1};
        });
    };
    render() {
        return (
            <View style={styles.container}>
                <TypeGame
                key={this.state.gameId}
                nextQuestion={this.nextQuestion}
                onPlayAgain={this.resetGame} 
                initialSeconds={5} 
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

