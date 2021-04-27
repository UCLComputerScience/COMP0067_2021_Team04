import React, { useState } from "react";
import {Text,Alert,
  View,
  Button,
  TextInput,
  StyleSheet
} from 'react-native'
import { Dimensions } from "react-native";
import ChooseUser from '../components/UserSelectIcon'

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
                colour = 'lightblue'
                isDisabled = {false}
                pic = {require('../imgs/gender.png')}
                onPress={() => {setTesting('student')
                                navigation.navigate('Login')}} />
            <ChooseUser
                level = 'Teacher'
                colour = 'red'
                isDisabled = {false}
                pic = {require('../imgs/gender.png')}
                onPress={() => {setTesting('teacher')
                                navigation.navigate('Login')}} />
            <ChooseUser
                level = 'Parent'
                colour = 'green'
                isDisabled = {false}
                pic = {require('../imgs/gender.png')}
                onPress={() => {setTesting('parent')
                                navigation.navigate('Login')}} />
                                  <ChooseUser
                level = 'Newbie? Click register on the next page'
                colour = 'teal'
                isDisabled = {false}
                pic = {require('../imgs/gender.png')}
                onPress={() => {setTesting('parent')
                                navigation.navigate('Login')}} />
                                </View>
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
        fontSize: 30,
        fontWeight: "bold",
        textAlign: 'center'
    },
})

export default UserSelectLogin;