

import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Button, StyleSheet, Animated } from 'react-native';
import RandomNumber from './RandomNumber';
import { shuffle } from "lodash";
import TargetSumTimer from '../components/TargetSumTimer';

// import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'

class TargetSum extends React.Component {
    static propTypes = {
        randomNumberCount: PropTypes.number.isRequired,
        initialSeconds: PropTypes.number.isRequired,
        onPlayAgain: PropTypes.func.isRequired,
    };
    state = {
        selectedIds: [],
        remainingSeconds: this.props.initialSeconds,
        initialSeconds: this.props.initialSeconds,
        
    };
    gameStatus = 'PLAYING';
    randomNumbers = Array
        .from({ length: this.props.randomNumberCount })
        .map(() => 1 + Math.floor(10 * Math.random()),
        );
    target = this.randomNumbers
        .slice(0, this.props.randomNumberCount - 2)
        .reduce((acc, curr) => acc + curr, 0);
    shuffledRandomNumbers = shuffle(this.randomNumbers)

    checkGameOver = () => {
        if (this.gameStatus !== 'PLAYING') {
            return false;
        }else{
            return true
        }
    }

    generateNextQuestion = () => {
        this.target = this.randomNumbers
        .slice(0, this.props.randomNumberCount - 2)
        .reduce((acc, curr) => acc + curr, 0);
        shuffledRandomNumbers = shuffle(this.randomNumbers)
        this.goal = [this.target]
        this.gameStatus = 'PLAYING'
    };

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
    gameScore = 0 

    calcGameStatus = (nextState) => {
        console.log('calcGameStatus')
        console.warn(this.state.score)
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
            this.gameScore = this.gameScore + 5
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
                <Text style = {styles.titleText}>  </Text>
                <Text style = {styles.titleText}>  </Text>

                <Text style = {styles.titleText}>Click the numbers that add up to the target:</Text>
                <Text style={[styles.target, styles['STATUS_' + gameStatus]]}>
                    {this.target}
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
                            <TargetSumTimer isPlaying={this.checkGameOver()}  length={this.state.initialSeconds}/>

            {this.gameStatus !== 'PLAYING' && (
            <Button title="Play Again" onPress={this.props.onPlayAgain} />)}
                    </View>
        );
    }
}

    const styles = StyleSheet.create({
        container: {
            backgroundColor: 'white',
            flex: 1,
        },
        titleText: {
            fontSize: 20,
            fontWeight: "bold",
            textAlign: 'center',
            marginTop: 5,
            marginHorizontal: 20
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

export default TargetSum;

