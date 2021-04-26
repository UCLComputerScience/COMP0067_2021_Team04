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
    console.warn(global.userType)
    return(
        <View style = {styles.container}>
            <ChooseUser
                level = 'Student'
                colour = 'lightblue'
                isDisabled = {false}
                onPress={() => {setTesting('student')
                                navigation.navigate('Login')}} />
            <ChooseUser
                level = 'Teacher'
                colour = 'red'
                isDisabled = {false}
                onPress={() => {setTesting('teacher')
                                navigation.navigate('Login')}} />
            <ChooseUser
                level = 'Parent'
                colour = 'green'
                isDisabled = {false}
                onPress={() => {setTesting('parent')
                                navigation.navigate('Login')}} />
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
    title: {
        fontSize: 30,
        fontWeight: "bold"
    },
})

export default UserSelectLogin;