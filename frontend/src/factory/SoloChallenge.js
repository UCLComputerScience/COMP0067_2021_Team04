import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Button, StyleSheet, Animated, ImageBackground } from 'react-native';
import RandomNumber from './RandomNumber';
import { first, shuffle } from "lodash";
// import {dos} from './LandingPage';
import ShuffleTimer from '../components/ShuffleTimer';
// import AppBar from './AppBar';
import GameHeader from '../components/GameHeader';
import Quit from '../components/QuitGame';
import { HeaderBackButton } from 'react-navigation';
import EndGame from '../components/EndGameModal';

global.practiceScorer = 0

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
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

class SoloChallenge extends React.Component {
    static propTypes = {
        randomNumberCount: PropTypes.number.isRequired,
        initialSeconds: PropTypes.number.isRequired,
        onPlayAgain: PropTypes.func.isRequired,
    };
    state = {
        selectedIds: [],
        remainingSeconds: this.props.initialSeconds,
        gameScore: 0,
    };

    generateQ = () => {
        return this.first * this.second
    }


    gameStatus = 'PLAYING';
    first = getRndInteger(1,12)
    second = getRndInteger(1,12)
    target = this.generateQ()
    goal = [this.target]
    randomNumbers = Array
        .from({ length: this.props.randomNumberCount })
        .map(() =>  getRndInteger(1,200))
        .concat(this.goal);

     timerController = () =>  {
         if(this.gameStatus === 'PLAYING') {
             return true
         } else {
             return false
         }
     }   

  

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

    generateNextQuestion = () => {
        this.target = this.generateQ()
        // this.goal = [this.target]
        // this.gameStatus = 'PLAYING'
        // this.state.isPlaying = true
    };



    calcGameStatus = (nextState) => {
        console.log('calcGameStatus')
        const sumSelected = nextState.selectedIds.reduce((acc, curr) => {
            return acc + this.shuffledRandomNumbers[curr];
        }, 0);
        if (nextState.remainingSeconds === 0) {
            global.practiceScorer = global.practiceScorer - 1
            return 'LOST';
        }
        if (sumSelected < this.target) {
            global.practiceScorer = global.practiceScorer - 2
            return 'PLAYING';
        }
        if (sumSelected === this.target) {
            global.practiceScorer = global.practiceScorer + 5
            return 'WON';
        }
        if (sumSelected > this.target) {
            global.practiceScorer = global.practiceScorer - 2
            return 'LOST';
        }
    }

    static navigationOptions = ({navigation}) => {
        return{
          headerLeft:(<HeaderBackButton onPress={()=>{navigation.navigate('Landing')}}/>)
       }
      }      


    render() {
        const gameStatus = this.gameStatus;
        return (
            <View style={styles.container}>
                  
                {/* {/* <Text style = {styles.titleText}>  </Text> */}
                <Text style = {styles.titleText}>  </Text>

                <Text style = {styles.titleText}>Select the correct answer for this multiplication:</Text>
                <Text style={[styles.target, styles['STATUS_' + gameStatus]]}> {this.first} x {this.second}
                </Text>
                <Text style = {styles.titleText}>Score: {global.practiceScorer}</Text>

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
                                <ShuffleTimer isPlaying ={this.timerController()} />

            </View>
            {this.gameStatus !== 'PLAYING' && (
            <Button title="Continue"  onPress={this.props.onPlayAgain} />)}
                                                
            {/* {this.gameStatus !== 'PLAYING' && (
            <Button title="Play Again" onPress={this.props.onPlayAgain} />)}
            {this.gameStatus == 'PLAYING' && (
            <Timer isPlaying ={true} />)} */}
        </View>
        );
    }
}


const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center"
    },
    container: {
        backgroundColor: 'white',
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
        margin: 30,
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
    tasksWrapper: {
                paddingTop: 40,
                paddingHorizontal: 20,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    items: {
        margin: 30
    },
    writeTaskWrapper: {
        position: 'absolute',
        bottom: 60,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    input: {
        paddingVertical: 15,
        paddingHorizontal: 15,
        backgroundColor: '#FFF',
        borderRadius: 60,
        borderColor: '#C0C0C0C0',
        borderWidth: 1,
        width: 250
    },
    addWrapper: {
        width: 60,
        height: 60,
        backgroundColor: '#FFF',
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#C0C0C0C0',
        borderWidth: 1,
    },
    addText: {}
});

export default SoloChallenge;