<script src="http://localhost:8097"></script>


import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Button, StyleSheet, Animated } from 'react-native';
import RandomNumber from '../src/components/RandomNumber';
import { shuffle } from "lodash";

// import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'



class Beginner extends React.Component {
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
    randomNumbers = Array
        .from({ length: this.props.randomNumberCount })
        .map(() => 1 + Math.floor(10 * Math.random()),
        );
    target = this.randomNumbers
        .slice(0, this.props.randomNumberCount - 2)
        .reduce((acc, curr) => acc + curr, 0);
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
                <Text style = {styles.titleText}>  </Text>
                <Text style = {styles.titleText}>  </Text>

                <Text style = {styles.titleText}>Select the correct answer for this multiplication:</Text>
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
            {this.gameStatus !== 'PLAYING' && (
            <Button title="Play Again" onPress={this.props.onPlayAgain} />)}
            
            <Text>{this.state.remainingSeconds}</Text>
        </View>
        );
    }
}

    const styles = StyleSheet.create({
        container: {
            color: 'white',
            flex: 1,
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

export default Beginner;

// import React from 'react';
// import { TextInput } from 'react-native';

// const UselessTextInput = () => {
//   const [value, onChangeText] = React.useState(' ');

//   return (
//     <TextInput  keyboardType = 'number-pad'
//                 keyboardAppearance = 'dark' 
//                 maxLength={2}
//       style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
//       onChangeText={text => onChangeText(text)}
//       value={value}
//     />
//   );
// }

// export default UselessTextInput;