import React, { Component } from 'react';
import { View } from 'react-native';
import Game from './Game';
import { StyleSheet } from 'react-native';
import { TabRouter } from 'react-navigation';

global.scoreTracker = 0

export default class MultiChoiceGame extends Component {
    state = {
        gameId: 1,
        challenge: 0,
        gamesWon: 0.05,
        challengeID: 0
    
    };
    
    resetGame = () => {
        global.scoreTracker = this.state.gamesWon
        console.warn(global.scoreTracker)
        this.setState((prevState) => {
            return { ...prevState,
                gameId: prevState.gameId + 1,
                gamesWon: prevState.gamesWon + 1/20
                    };
        });
    };
    checkChallenge = ()=>{
        if(this.props.route.params) {
        console.log(this.props.route.params.challenge)
        console.log(this.props.route.params.challengeID)
        if(this.props.route.params.challenge){
            this.setState((prevState) => {
                return { ...prevState,
                    challenge: this.props.route.params.challenge,
                    challengeID: this.props.route.params.challengeID}
                
        })}
    }}
    componentDidMount(){
    this.checkChallenge()
}
    render() {
        return (
            <View style={styles.container}>
                <Game
                key={this.state.gameId}
                onPlayAgain={this.resetGame} 
                randomNumberCount={5} 
                initialSeconds={120} 
                challenge={this.state.challenge}
                challengeID={this.state.challengeID}
                gamesWon={this.state.gamesWon}
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