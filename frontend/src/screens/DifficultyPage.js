import React, {Component} from 'react';
import {Text, Alert, View, StyleSheet} from 'react-native';
import DifficultyButton from '../components/DifficultyButton';

const DifficultyPage = ({navigation})=>{
    
    return(
        <View style = {styles.container}>
            <Text style = {styles.title}>Choose Your Difficulty!</Text>
            {/*<Text style = {styles.container}> Beginner</Text>*/}
            <DifficultyButton
                level = 'Beginner'
                colour = '#cd7f32'
                isDisabled = {false}
                onPress={() => navigation.navigate('Load')}>
            </DifficultyButton>
            <DifficultyButton
                level = 'Intermediate'
                colour = '#c0c0c0'
                isDisabled = {false}
                onPress={() => navigation.navigate('Load')}>
            </DifficultyButton>
            <DifficultyButton
                level = 'Advanced'
                colour = '#ffd700'
                isDisabled = {true}
                onPress={() => navigation.navigate('Load')}>
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