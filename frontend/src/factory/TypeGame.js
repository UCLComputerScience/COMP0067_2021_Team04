import React, {useState} from "react";
import PropTypes from 'prop-types';
import { View, Text, Button, StyleSheet, TextInput} from 'react-native';
import RandomNumber from './RandomNumber';
import { result, shuffle } from "lodash";
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


// import Typing from '../screens/Typing';
// import { useState }  from 'react';
// import { useReducer } from 'react';
// import { TouchableOpacity } from 'react-native-gesture-handler';
// import Task from '../components/Task';

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

function Typing() {
    const [answer, setAnswer] = useState(' ');
    return (
        <View style={styles.typeContainer}>
        <Text>Enter your answer:</Text>
        <TextInput 
        style={styles.input}
        placeholder='e.g. JohnDoe'
        onChangeText={(val) => setAnswer(val)}
        keyboardType='numeric' />
        <Text>answer: {answer}</Text></View>
    );
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

// const [task, setTask] = useState();
// const [taskItems, setTaskItems] = useState([]);

// const handleAddTask = () => {
//     Keyboard.dismiss();
//     setTaskItems([...taskItems, task])
//     setTask(null);
// }

// const completeTask = (index) => {
//     let itemsCopy = [...taskItems];
//     itemsCopy.splice(index, 1);
//     setTaskItems(itemsCopy)
// }

// const [text, setText] = useState('');


class TypeGame extends React.Component {
    

    static propTypes = {
        randomNumberCount: PropTypes.number.isRequired,
        initialSeconds: PropTypes.number.isRequired,
        onPlayAgain: PropTypes.func.isRequired,
        onPress: PropTypes.func.isRequired,
    };
    state = {
        selectedIds: [],
        remainingSeconds: this.props.initialSeconds,
        num1: 0,
        // num2: 0,
        operator: "",
        result: 0
    };
    
    handleText = (text, inputNumber) => {
        if(Number.isInteger(+text)) {
            inputNumber == 1 
            ? this.setState({num1: +text})
            : this.setState({num2: +text});
        };
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
        }, 5000);
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
                // this.gameStatus=this.compareAnswer(nextState)
                if (this.gameStatus !== 'PLAYING') {
                    clearInterval(this.intervalId);
                }
            }
    }

        compareAnswer = () => {
        const answer = this.state.num1
        // console.warn(answer)
        console.warn(this.gameStatus)
        if (answer < this.target) {
            return 'LOST';
        }
        if (answer === this.target) {
            return 'WON';
        }
        if (answer > this.target) {
            return 'LOST';
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

    static navigationOptions = ({navigation}) => {
        return{
          headerLeft:(<HeaderBackButton onPress={()=>{navigation.navigate('Landing')}}/>)
       }
      }      

    render() {
        const gameStatus = this.gameStatus;
        // const [Score, setScore] = useState(0)

//         function incrementScore(){
//             setScore(prevScore => prevScore + 1)
// }
        return (
            <View style={styles.container}>
                  <GameHeader></GameHeader>
                    <Text style = {styles.titleText}>  </Text>

                <Text style = {styles.titleText}>Select the correct answer for this multiplication:</Text>
                <Text style = {styles.titleText}>Score: 1/10</Text>
                
            {/* <Button title="Play Again" onPress={this.props.onPlayAgain} /> */}
                <Text style={[styles.target, styles['STATUS_' + gameStatus]]}> 2 x {this.target / 2}
                </Text>
                <Input onChangeText={(text) => this.handleText(text, 1)} 
                placeholder="....."
                label="Type answer here..."
                />
                <Text>The Result is : {this.state.num1}</Text>
                {/* <TestTimer isPlaying ={true} /> */}
                <MathButton onPress={this.compareAnswer} />


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