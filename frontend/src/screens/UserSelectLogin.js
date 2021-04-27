import React, { useState } from "react";
import {Text,Alert, TouchableOpacity,
  View,
  Button,
  TextInput,
  StyleSheet
} from 'react-native'

import { Dimensions } from "react-native";
import ChooseUser from '../components/UserSelectIcon'
import { Ionicons, MaterialIcons } from "@expo/vector-icons";


const screenWidth = Dimensions.get("window").width;

global.userType = ' ';

const UserSelectLogin = ({route,navigation})=>{
    const [modalVisible, setModalVisible] = useState(false);
    const [testing, setTesting] = useState();
    global.userType = testing;
    return(
        <View style = {styles.container}>
            <View style={styles.randomContainer}>
            <ChooseUser
                level = 'Student'
                colour = 'red'
                iconName = 'school-outline'
                iconColor = 'red'
                isDisabled = {false}
                // pic = {require('../imgs/penguin.png')}
                onPress={() => {setTesting('student')
                                navigation.navigate('Login')}} />
            <ChooseUser
                level = 'Teacher'
                colour = 'lightblue'
                iconName = 'book-outline'
                iconColor = 'green'
                isDisabled = {false}
                // pic = {require('../imgs/penguin.png')}
                onPress={() => {setTesting('teacher')
                                navigation.navigate('Login')}} />
            <ChooseUser
                level = 'Parent'
                colour = 'green'
                iconName = 'people-outline'
                iconColor = 'blue'
                // pic = {require('../imgs/penguin.png')}
                onPress={() => {setTesting('parent')
                                navigation.navigate('Login')}} />
                                </View>
                                <TouchableOpacity onPress={() => {setTesting('teacher')
                                navigation.navigate('Register as:')}}>
                                <Text style={styles.text}>New here? Click to Register</Text>
                                </TouchableOpacity>
                         
        </View>
    )}


const styles = StyleSheet.create({
    container: {
        position: 'relative',
        alignItems: 'center',
        flex: 1,
        justifyContent: 'space-evenly',
        flexDirection: 'column',
        backgroundColor: 'white'
    },
    randomContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: 'center'
    },
    text: {
        fontSize: 24,
        fontFamily: "HelveticaNeue",
        color: "#52575D",
        textAlign: 'center',
        marginBottom: 75
    },
})

export default UserSelectLogin;