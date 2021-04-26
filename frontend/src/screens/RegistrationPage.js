import React from 'react'
import {
  View,
  Button,
  TextInput,
  StyleSheet
} from 'react-native'
import { Dimensions } from "react-native";
import axios from 'axios';


const screenWidth = Dimensions.get("window").width;

export default class SignUp extends React.Component {
  state = {
    username: '', password: '', email: '', phone_number: ''
  }
  onChangeText = (key, val) => {
    this.setState({ [key]: val })
  }
  signUp = async () => {
    const { username, password, email, phone_number } = this.state
    try {
      // here place your signup logic
      
      console.log('user successfully signed up!: ', success)
    } catch (err) {
      console.log('error signing up: ', err)
    }
  }
 
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder='Username'
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={val => this.onChangeText('username', val)}
        />
          <TextInput
          style={styles.input}
          placeholder='First Name'
          secureTextEntry={true}
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={val => this.onChangeText('firstName', val)}
        />
          <TextInput
          style={styles.input}
          placeholder='Last Name'
          secureTextEntry={true}
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={val => this.onChangeText('lastName', val)}
        />
        <TextInput
          style={styles.input}
          placeholder='Password'
          secureTextEntry={true}
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={val => this.onChangeText('password', val)}
        />
        <View style={styles.line}></View>
        <TextInput
          style={styles.input}
          placeholder='Class Id'
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={val => this.onChangeText('Class_Id', val)}
        />
        <TextInput
          style={styles.input}
          placeholder='Child Key'
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={val => this.onChangeText('Child_Key', val)}
        />
        <Button
          title="Let's Go"
          onPress={() => this.props.navigation.navigate('numberFit')}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  input: {
    width: 350,
    height: 55,
    backgroundColor: '#42A5F5',
    margin: 10,
    padding: 8,
    color: 'white',
    borderRadius: 14,
    fontSize: 18,
    fontWeight: '500',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  line: {
    width: screenWidth,
    borderWidth: 3,
    backgroundColor: 'black'
  }
})