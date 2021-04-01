import React, {Component} from 'react';
import {Text, Alert, View, StyleSheet, Pressable, Modal} from 'react-native';
import DifficultyButton from '../components/DifficultyButton';
import OptionModal from '../components/OptionModal';
import { useState } from "react";


const DifficultyPage = ({navigation})=>{
    const [modalVisible, setModalVisible] = useState(false);
    return(
        <View style = {styles.container}>
            <Text style = {styles.title}>Choose Your Difficulty!</Text>
            
            <DifficultyButton
                level = 'Beginner'
                colour = '#cd7f32'
                isDisabled = {false}
                onPress={() => Alert.alert(
                "Options",
                "Please select an option",
                [
                {
                    text: "Watch Video!",
                    onPress: () => Alert.alert('Please confirm: ', "Click 'Let's workout' to play the video",[{text: "Let's workout!",
                    onPress: () => navigation.navigate('Video')},
                { text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel" },]),
                    style: "cancel"
                },
                { text: "Test", onPress: Alert.alert('Please confirm: ', 'Once you start a test your marks will be visible to teachers and parents',
                [{text: 'Start Test!', onPress: () => navigation.navigate('Load Test') },
                 {text: 'Cancel', onPress:  () => console.log("Cancel Pressed"),
                    style: "cancel" },]),
                    style: "cancel" },
                { text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel" },
                ]
            )} >
            </DifficultyButton>
            <DifficultyButton
                level = 'Intermediate'
                colour = '#c0c0c0'
                isDisabled = {false}
                onPress={() => Alert.alert(
                "Options",
                "Please select an option",
                [
                {
                    text: "Watch Video!",
                    onPress: () => Alert.alert('Please confirm: ', "Click 'Let's workout' to play the video",[{text: "Let's workout!",
                onPress: () => navigation.navigate('Video')},
                { text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel" },]),
                    style: "cancel"
                },
                { text: "Test", onPress: Alert.alert('Please confirm: ', 'Once you start a test your marks will be visible to teachers and parents',
                [{text: 'Start Test!', onPress: () => navigation.navigate('Load Test') }, {text: 'Cancel',
                onPress:  () => console.log("Cancel Pressed"),
                tyle: "cancel" },]),
                    style: "cancel" },
                { text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel" },
                ]
            )} >
            </DifficultyButton>
            <DifficultyButton
                level = 'Advanced'
                colour = '#ffd700'
                isDisabled = {true}
                onPress={() => Alert.alert(
                "Options",
                "Please select an option",
                [
                {
                    text: "Watch Video!",
                    onPress: () => Alert.alert('Please confirm: ', "Click 'Let's workout' to play the video",[{text: "Let's workout!",
                onPress: () => navigation.navigate('Video')},
                { text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel" },]),
                    style: "cancel"
                },
                { text: "Test", onPress: Alert.alert('Please confirm: ', 'Once you start a test your marks will be visible to teachers and parents',
                [{text: 'Start Test!', onPress: () => navigation.navigate('Load Test') }, {text: 'Cancel',
                onPress:  () => console.log("Cancel Pressed"),
                tyle: "cancel" },]),
                    style: "cancel" },
                { text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel" },
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