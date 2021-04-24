import React, {useState} from "react";
import PropTypes from 'prop-types';
import { View, Text, Button, StyleSheet, TextInput} from 'react-native';
import RandomNumber from './RandomNumber';
import { isInteger, result, shuffle } from "lodash";
// import {dos} from './LandingPage';
import Timer from '../components/Timer';
// import AppBar from './AppBar';
import GameHeader from '../components/GameHeader';
import Quit from '../components/QuitGame';
import { HeaderBackButton } from 'react-navigation';
import TestTimer from '../components/TestTimer';
import EndGame from '../components/EndGameModal';
import Input from '../components/Input';
import MathButton from '../components/MathButton';
import { Dimensions } from "react-native";
import LandingPage from '../screens/LandingPage';
import {two} from '../screens/LandingPage';
import {three} from '../screens/LandingPage';
import {four} from '../screens/LandingPage';
import {five} from '../screens/LandingPage';
import {six} from '../screens/LandingPage';
import {seven} from '../screens/LandingPage';
import {eight} from '../screens/LandingPage';
import {nine} from '../screens/LandingPage';
import {ten} from '../screens/LandingPage';
import {eleven} from '../screens/LandingPage';
import {twelve} from '../screens/LandingPage';
import {ChangeChoice} from '../screens/LandingPage';
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import TestOverModal from '../components/TestOverModal';
import { Alert } from "react-native";
import Rocket from '../animations/Rocket';


const screenWidth = Dimensions.get("window").width;

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
}}


const twomultiplier = 2 
const threemultiplier = 3
const fourmultiplier = 4
const fivemultiplier = 5
const sixmultiplier = 6
const sevenmultiplier = 7
const eightmultiplier = 8
const ninemultiplier = 9
const tenmultiplier = 10
const elevenmultiplier = 11
const twelvemultiplier = 12

class TypeGame extends React.Component {
    
    state = {
        selectedIds: [],
        remainingSeconds: this.props.initialSeconds,
        efficiency: this.props.initialSeconds-this.props.initialSeconds,
        num1: isInteger,
        result: isInteger,
        testScore: 0,
        disabled: false,
        isPlaying: true,
        emptyText: " ",
        questionsAnswered: 0,
        multiplier: 2,
        initialTime: this.props.initialSeconds,
    }
    static propTypes = {
        randomNumberCount: PropTypes.number.isRequired,
        initialSeconds: PropTypes.number.isRequired,
        onPlayAgain: PropTypes.func.isRequired,
        onPress: PropTypes.func.isRequired,
        nextQuestion: PropTypes.func.isRequired,
    };
 
    handleText = (text, inputNumber) => {
        if(Number.isInteger(+text)) {
            inputNumber == 1 
            ? this.setState({num1: +text})
            : this.setState({num2: +text});
        };
    };


    gameStatus = 'PLAYING';
    gameOver = 'GAME_IN_PLAY';
    testTime = this.state.initialTime-this.state.efficiency


    target = global.TT * this.state.multiplier
    goal = [this.target]

    handleTimer = () => {
        if(this.gameOver === 'GAME_OVER' ) {
            return false
        }else{
            return true
        }
    };

    qgenerator = () => {
        while(this.state.multiplier <= 11) {
            return this.state.multiplier + 1
        }
    }

    generateNextQuestion = () => {
        this.state.multiplier = this.qgenerator()
        this.target = global.TT * this.state.multiplier 
        this.goal = [this.target]
        this.gameStatus = 'PLAYING'
        this.state.disabled = false
        this.state.isPlaying = true
    };

    pauseTimer = () => {
        if (this.state.isPlaying === false) {
            clearInterval(this.intervalId);
        }}
    
    calcAccuracy = () => {
        var accuracy = (this.state.testScore / this.state.questionsAnswered) * 100
        if (accuracy > 0) {
        return Math.round(accuracy);
    }
    else {
        return 0;
    }}

    pauseTimer = () => {
        if (this.state.isPlaying === false) {
            clearInterval(this.intervalId);
        }}

    componentDidMount() {
        this.intervalId2 = setInterval(() => {
            this.setState(
                (prevState) => {
                return { efficiency: prevState.efficiency + 1 };
            },
            () => {
                if (this.gameOver === 'GAME_OVER') {
                    clearInterval(this.intervalId2);
                }
            },
            );
        }, 1000);
        this.intervalId = setInterval(() => {
            this.setState(
                (prevState) => {
                return { remainingSeconds: prevState.remainingSeconds - 1 };
            },
            () => {
                if (this.state.remainingSeconds === 0) {                    
                    this.gameOver = 'GAME_OVER';
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
            
        compareAnswer = () => {
        const answer = this.state.num1
        if (answer === this.target) {
            this.state.testScore = this.state.testScore + 1
            return 'WON';
        }
        if (answer !== this.target) {
            return 'LOST';
        }
    }

    checkGameOver = () => {
        const totalQuestions = this.state.questionsAnswered
        if (totalQuestions === 10) {
            return 'GAME_OVER';
        }else{
            return 'GAME_IN_PLAY'
        }
    }

    collectTime = () => {
        const timeTaken = this.state.efficiency
        const isGameOver = this.gameOver
        // console.warn(timeTaken)
        if (isGameOver === 'GAME_OVER') {
            clearInterval(this.intervalId);
            return timeTaken;
        }
    }

    static navigationOptions = ({navigation}) => {
        return{
          headerLeft:(<HeaderBackButton onPress={()=>{navigation.navigate('Landing')}}/>)
       }
      }      

    render() {
        const gameStatus = this.gameStatus;
        const testTime = this.testTime
        return (
            <View style={styles.container}>
                  <GameHeader></GameHeader>
                    <Text style = {styles.titleText}>  </Text>

                <Text style = {styles.titleText}>Type the correct answer for this multiplication:</Text>
                <Text style={[styles.target, styles['STATUS_' + gameStatus]]}> {global.TT} x {this.state.multiplier}
                </Text>
                
                {this.gameOver === 'GAME_OVER' && (
                <TestOverModal score={this.state.testScore}
                                accuracy={this.calcAccuracy()}
                                total={this.state.questionsAnswered}
                                onPress={() => this.props.navigation.navigate('Landing')} 
                                gameEnd={this.gameOver}
                                timestable = {global.TT}   />)}

                <Input onChangeText={(text) => this.handleText(text, 1)} 
                placeholder="....."
                label="Type answer here..."
                />
                {/* this.state.isPlaying */}
                                <View style={styles.timerContainer}><TestTimer isPlaying={this.handleTimer()} />
                                <MathButton onPress={() => {this.gameStatus = this.compareAnswer();
                                                            this.gameOver = this.checkGameOver();
                                                            this.collectTime();
                                                            this.handleTimer();
                                                            this.state.questionsAnswered = this.state.questionsAnswered + 1;
                                                            this.calcAccuracy();
                                                            this.state.disabled = true;}}
                                                            disabled={this.state.disabled}/>
                                            

                                </View>
                                {this.gameStatus !== 'PLAYING' && (
            <Button title="Continue"  onPress={() => {this.generateNextQuestion();
                                                this.state.disabled === false}} />)}
                                                {/* <Button title="Move"  onPress={() => this.props.navigation.navigate('Challenge')}/> */}


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
        timerContainer: {
            width: screenWidth,
            height: 50,
            justifyContent: 'space-around',
            flex: 1,
            flexDirection: 'row',
            marginVertical: -10

        },
        titleText: {
            fontSize: 20,
            fontWeight: "bold",
            textAlign: 'center',
            marginTop: 5
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
        typeContainer: {
            flex: 1,
            backgroundColor: 'white',
            alignItems: 'center',
            justifyContent: 'flex-start',
        },
        input: {
            borderWidth: 1,
            borderColor: '#777',
            padding: 8,
            margin: 10,
            width: 200
        },
        addText: {}
    });
          
export default TypeGame;