<script src="http://localhost:8097"></script>


import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Button, StyleSheet, Animated } from 'react-native';
import RandomNumber from './RandomNumber';
import { shuffle } from "lodash";
import {dos} from '../../src/components/LandingPage';
import Timer from '../components/Timer';
import AppBar from '../../src/components/AppBar';
import Header from '../../src/components/Header';

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

function multiplesOf(numbers, number) { // add second argument
    var multiples = []; // change to array (so that we can store multiple numbers - not just one multiple)
    for (var i = 0; i < numbers.length; i++) {
      if (numbers[i] % number === 0) { // divide by the number
        multiples.push(numbers[i]); // add the current multiple found to the multiples array
      }
    }
    return multiples;
  }

  function genNo() { 
  var arr = [];
  while(arr.length < 5) {
  var r = Math.floor(Math.random() * 100) + 1;
  if(arr.indexOf(r) === -1) arr.push(r);
}
}

class Game extends React.Component {
    static propTypes = {
        randomNumberCount: PropTypes.number.isRequired,
        initialSeconds: PropTypes.number.isRequired,
        onPlayAgain: PropTypes.func.isRequired,
    };
    state = {
        selectedIds: [],
        remainingSeconds: this.props.initialSeconds,
    };
    gameStatus = 'PLAYING';
    target = 2 * Math.floor(getRandomIntInclusive(1,12))
    goal = [this.target]
    randomNumbers = Array
        .from({ length: this.props.randomNumberCount })
        .map(() => 4 + Math.floor(20 * Math.random())) 
        .concat(this.goal);

    shuffledRandomNumbers = shuffle(this.randomNumbers)

    componentDidMount() {
        this.intervalId = setInterval(() => {
            this.setState(
                (prevState) => {
                return { remainingSeconds: prevState.remainingSeconds - 1 };
            },
            () => {
                if (this.state.remainingSeconds === 0) {
                    clearInterval(this.intervalId);
                }
            },
            );
        }, 1000);
    }
    componentWillUnmount() {
        clearInterval(this.intervalId);
    }
    isNumberSelected = (numberIndex) => {
        return this.state.selectedIds.indexOf(numberIndex) >= 0;
    };
    selectNumber = (numberIndex) => {
        this.setState((prevState) => ({ 
            selectedIds: [...prevState.selectedIds, numberIndex],
        }));
    };
    componentWillUpdate(nextProps, nextState) {
        if (
            nextState.selectedIds !== this.state.selectedIds ||
            nextState.remainingSeconds === 0
            ) {
                this.gameStatus = this.calcGameStatus(nextState);
                if (this.gameStatus !== 'PLAYING') {
                    clearInterval(this.intervalId);
                }
            }
    }
    calcGameStatus = (nextState) => {
        console.log('calcGameStatus')
        const sumSelected = nextState.selectedIds.reduce((acc, curr) => {
            return acc + this.shuffledRandomNumbers[curr];
        }, 0);
        if (nextState.remainingSeconds === 0) {
            return 'LOST';
        }
        if (sumSelected < this.target) {
            return 'PLAYING';
        }
        if (sumSelected === this.target) {
            return 'WON';
        }
        if (sumSelected > this.target) {
            return 'LOST';
        }
    }

    render() {
        const gameStatus = this.gameStatus;
        return (
            <View style={styles.container}>
                  <Header></Header>
                {/* {/* <Text style = {styles.titleText}>  </Text> */}
                <Text style = {styles.titleText}>  </Text>

                <Text style = {styles.titleText}>Select the correct answer for this multiplication:</Text>
                <Text style={[styles.target, styles['STATUS_' + gameStatus]]}> 2 x {this.target / 2}
                </Text>
                <View style={styles.randomContainer}>
                    {this.shuffledRandomNumbers.map((randomNumber, index) => (
                    <RandomNumber 
                    key={index} 
                    id={index}
                    number={randomNumber} 
                    isDisabled={this.isNumberSelected(index) || gameStatus !== 'PLAYING' }
                    onPress={this.selectNumber}
                    />
                ))}
            </View>
            {/* <Timer/> */}
            {this.gameStatus !== 'PLAYING' && (
            <Button title="Play Again" onPress={this.props.onPlayAgain} />)}
            {this.gameStatus == 'PLAYING' && (
            <Timer isPlaying ={true} />)}
    
        </View>
        );
    }
}

    const styles = StyleSheet.create({
        container: {
            color: 'white',
            flex: 1,
        },
        timercontainer: {
            color: 'white',
            flex: 1,
            alignItems: 'flex-start',
            justifyContent: 'flex-end',
            marginVertical: 20,
            marginHorizontal: 30,
        },
        titleText: {
            fontSize: 20,
            fontWeight: "bold",
            textAlign: 'center',
        },
        target: {
            fontSize: 50,
            backgroundColor: '#bbb',
            margin: 50,
            textAlign: 'center',
        },
        randomContainer: {
            flex: 1,
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
        },
        STATUS_PLAYING: {
            backgroundColor: '#bbb',
        },
        STATUS_WON: {
            backgroundColor: 'green',
        },
        STATUS_LOST: {
            backgroundColor: 'red',
        },

    });

export default Game;

