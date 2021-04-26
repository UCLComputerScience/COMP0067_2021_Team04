import React, {useState} from "react";
import PropTypes from 'prop-types';
import { View, Text, Button, StyleSheet, TextInput} from 'react-native';
import RandomNumber from './RandomNumber';
import { isInteger, result, shuffle } from "lodash";
import Timer from '../components/Timer';
import GameHeader from '../components/GameHeader';
import Quit from '../components/QuitGame';
import { HeaderBackButton } from 'react-navigation';
import TestTimer from '../components/TestTimer';
import EndGame from '../components/EndGameModal';
import Input from '../components/Input';
import MathButton from '../components/MathButton';
import { Dimensions } from "react-native";
import LandingPage from '../screens/LandingPage';
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import TestOverModal from '../components/TestOverModal';
import { Alert } from "react-native";
import * as Progress from 'react-native-progress';
import { useNavigation } from '@react-navigation/native';

const screenWidth = Dimensions.get("window").width;

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

global.activity = 1

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
        progress: 0
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
    gameMode = global.gameMode

    setGameMode = () => {
        if (global.difficultyLevel === 'beg') {
            return global.TT * this.state.multiplier;
        }
        if (global.difficultyLevel === 'int') {
            return global.TT * Math.floor(getRandomIntInclusive(1,12));
        }
        if (global.difficultyLevel === 'adv') {
            return global.TT * Math.floor(getRandomIntInclusive(1,16));
    }
}

setMultiplier = () => {
    if (global.difficultyLevel === 'beg') {
        return this.state.multiplier;
    }
    else{
        return this.target / global.TT;
}
}

    target = this.setGameMode()
    goal = [this.target]

    handleTimer = () => {
        if(this.gameOver === 'GAME_OVER' ) {
            return false
        }else{
            return true
        }
    };
    


     GoToButton({ screenName }) {
        const navigation = useNavigation();
    }

    qgenerator = () => {
        while(this.state.multiplier <= 11) {
            return this.state.multiplier + 1
        }
    }

    qgeneratorAdvanced = () => {
        if(this.questionsAnswered < 6) {
            return this.qgenerator()
        }
    }

    generateNextQuestion = () => {
        this.state.multiplier = this.qgenerator()
        this.target = this.setGameMode()
        this.goal = [this.target]
        this.gameStatus = 'PLAYING'
        this.state.disabled = false
        this.state.isPlaying = true
    };

    calcAccuracy = () => {
        var accuracy = (this.state.testScore / this.state.questionsAnswered) * 100
        if (accuracy > 0) {
        return Math.round(accuracy);
    }
    else {
        return 0;
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
            global.activity = global.activity + 1
            return 'GAME_OVER';
        }else{
            return 'GAME_IN_PLAY'
        }
    }

    collectTime = () => {
        const timeTaken = this.state.efficiency
        const isGameOver = this.gameOver
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
        return (
            <View style={styles.container}>
                  <Progress.Bar progress={this.state.progress} width={screenWidth} height={10} unfilledColor={'gray'} />
                    <Text style = {styles.titleText}>  </Text>
                <Text style = {styles.titleText}>Type the correct answer for this multiplication:</Text>
                <Text style={[styles.target, styles['STATUS_' + gameStatus]]}> {global.TT} x {this.setMultiplier()}
                </Text>
                
                {this.gameOver === 'GAME_OVER' && (
                <TestOverModal score={this.state.testScore}
                                accuracy={this.calcAccuracy()}
                                total={this.state.questionsAnswered}
                                onPress={() => navigation('Landing')} 
                                gameEnd={this.gameOver}
                                timeTaken={this.state.efficiency}
                                timestable = {global.TT}
                                  />)}

                <Input onChangeText={(text) => this.handleText(text, 1)} 
                placeholder="....."
                label="Type answer here..."
                />
                                <View style={styles.timerContainer}><TestTimer isPlaying={this.handleTimer()} />
                                <MathButton onPress={() => {this.gameStatus = this.compareAnswer();
                                                            this.gameOver = this.checkGameOver();
                                                            this.collectTime();
                                                            this.handleTimer();
                                                            this.state.questionsAnswered = this.state.questionsAnswered + 1;
                                                            this.state.progress = this.state.progress + 1/11;
                                                            this.calcAccuracy();
                                                            // this.setGameMode();
                                                            this.state.disabled = true;}}
                                                            disabled={this.state.disabled}/>
                                            

                                </View>
                                {this.gameStatus !== 'PLAYING' && (
            <Button title="Continue"  onPress={() => {this.generateNextQuestion();
                                                this.state.disabled === false}} />)}
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