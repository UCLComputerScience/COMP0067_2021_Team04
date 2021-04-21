import React, {Component} from 'react';
import {Text, Alert, View, StyleSheet, Pressable, Modal} from 'react-native';
import DifficultyButton from '../components/DifficultyButton';
import OptionModal from '../components/OptionModal';
import { useState } from "react";


const DifficultyPage = ({route, navigation})=>{
    const [modalVisible, setModalVisible] = useState(false);
    const { difficulty, otherParam } = route.params;
    console.log(difficulty)
    return(
        <View style = {styles.container}>
            <Text style = {styles.title}>Choose Your Difficulty!</Text>
            
            <DifficultyButton
                level = 'Beginner'
                colour = '#cd7f32'
                isDisabled = {false}
                onPress={() => Alert.alert(
                    "Please select an option: ",
                    "Note: Once you start a test your marks will be visible to teachers and parents",
                    [
                        {
                        text: "Cancel",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                        },
                        { text: "Watch Video", onPress: () => navigation.navigate('Load Video') },
                        { text: "Start Test!", onPress: () => navigation.navigate('Load Test') }
                    ]
                    )}        >
            </DifficultyButton>
            <DifficultyButton
                level = 'Intermediate'
                colour = '#c0c0c0'
                isDisabled = {difficulty =="beginner" ? true : false }
                onPress={() => Alert.alert(
                    "Please select an option: ",
                    "Note: Once you start a test your marks will be visible to teachers and parents",
                    [
                        {
                        text: "Cancel",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                        },
                        { text: "Watch Video", onPress: () => navigation.navigate('Load Video') },
                        { text: "Start Test!", onPress: () => navigation.navigate('Load Test') }
                    ]
                    )} >
            </DifficultyButton>
            <DifficultyButton
                level = 'Advanced'
                colour = '#ffd700'
                isDisabled = {difficulty ==="advanced" ? false : true }
                onPress={() => Alert.alert(
                    "Please select an option: ",
                    "Note: Once you start a test your marks will be visible to teachers and parents",
                    [
                        {
                        text: "Cancel",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                        },
                        { text: "Watch Video", onPress: () => navigation.navigate('Load Video') },
                        { text: "Start Test!", onPress: () => navigation.navigate('Load Test') }
                    ]
                    )} >
            </DifficultyButton>
        </View>
    )}


const styles = StyleSheet.create({
    container: {
        position: 'relative',
        alignItems: 'center',
        flex: 1,
        justifyContent: 'space-evenly',
        flexDirection: 'column',
    },
    title: {
        fontSize: 30,
        fontWeight: "bold"
    }
}
)


export default DifficultyPage;