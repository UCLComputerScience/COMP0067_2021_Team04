

import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Button, StyleSheet, Animated } from 'react-native';
import RandomNumber from './RandomNumber';
import { shuffle } from "lodash";
import TargetSumTimer from '../components/TargetSumTimer';

// import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'

global.targetSumScorer = 0

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
        // answer: isInteger,
        gameScore: 0,

        
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

    targetScore = 0

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

    compareAnswer = () => {
        const answer = this.state.answer
        if (answer === this.target) {
            this.state.gameScore = this.state.gameScore + 1
            return 'WON';
        }
        if (answer !== this.target) {
            return 'LOST';
        }
    }

    calcGameStatus = (nextState) => {
        console.log('calcGameStatus')
        console.warn(this.state.score)
        const sumSelected = nextState.selectedIds.reduce((acc, curr) => {
            return acc + this.shuffledRandomNumbers[curr];
        }, 0);
        if (nextState.remainingSeconds === 0) {
            global.targetSumScorer = global.targetSumScorer - 1
            this.targetScore = this.targetScore - 1
            return 'LOST';
        }
        if (sumSelected < this.target) {
            global.targetSumScorer = global.targetSumScorer - 2
            this.targetScore = this.targetScore - 2

            return 'PLAYING';
        }
        if (sumSelected === this.target) {
            global.targetSumScorer = global.targetSumScorer + 5
            this.targetScore = this.targetScore + 5

            return 'WON';
        }
        if (sumSelected > this.target) {
            global.targetSumScorer = global.targetSumScorer - 2
            this.targetScore = this.targetScore - 2
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
                {/* <Text style={styles.targetSumScorer}>Score: {this.targetScore}</Text> */}

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
            <Button title="Next Question" onPress={this.props.onPlayAgain} />)}
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
            fontSize: 45,
            backgroundColor: '#bbb',
            margin: 30,
            textAlign: 'center',
        },
        targetSumScorer: {
            fontSize: 20,
            backgroundColor: '#bbb',
            textAlign: 'center',
            marginBottom: 25
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

