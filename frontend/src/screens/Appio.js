import React, {useState}  from 'react';
import {Component} from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import Input from '../components/Input';
import MathButton from '../components/MathButton';

export default class Example extends Component {
    state = {
        num1: 0,
        num2: 0,
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

    handleOperation = (opCode) => {
    switch (opCode){
        case 1:
            this.setState({result: this.state.num1 + this.state.num2});
            break;
            case 2:
                this.setState({result: this.state.num1 - this.state.num2});
                break;
                case 3:
                    this.setState({result: this.state.num1 * this.state.num2});
                    break;
                    case 4:
                        if (this.state.num2 !== 0)
                        this.setState({result: this.state.num1 / this.state.num2});
                        else this.setState({ result: "Not Applicable"})
                        break;
    }
}
    render() {
        return (
            <View style={styles.container}>
                <Text>React Native Text Input Tutorial</Text>
                <Input onChangeText={(text) => this.handleText(text, 1)} 
                placeholder="Enter First Number"
                label="First Number"/>
                <Input onChangeText={(text) => this.handleText(text, 2)} 
                placeholder="Enter Second Number"
                label="Second Number"/>
                <View style={styles.buttonContainer}>
                <Button text="+" onPress={() => this.handleOperation(1)} />
                <Button text="-" onPress={() => this.handleOperation(2)} />
                <Button text="*" onPress={() => this.handleOperation(3)} />
                <Button text="/" onPress={() => this.handleOperation()} />

                </View>
                <Text>The Result is : {this.state.result}</Text>
                </View>
                
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        borderColor: 'black',
        borderWidth: 1,
        width: 400,
        padding: 10
    },
    buttonContainer: {
        flexDirection: 'row'
    },
})