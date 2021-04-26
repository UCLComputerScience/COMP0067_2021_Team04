import React, { useState }  from 'react';
import {Component} from 'react';
import { Dimensions } from "react-native";
import { Alert, Button, Platform, SafeAreaView, StatusBar, StyleSheet, Text, View, ScrollView } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Progress from '../components/ProgressBar';
import Table from '../components/Datatable';
import LineGraph from '../components/LineGraph';
import ProgressRing from '../components/ProgressRing';
import TaskModal from '../components/TasksModal';
import PropTypes from 'prop-types';
import Task from '../components/Task';

const screenWidth = Dimensions.get("window").width;

const TaskComp = (assignment, progress, timeLeft) => {
        
    return (<View>
      <Text style={styles.ttTitle}>{assignment}</Text>
      <Progress  completion={progress}/>
      <View style={styles.stretch}>
      <MaterialCommunityIcons name="timer-sand-full" color={'gray'} size={30} style={styles.tinyLogo} />
      <Text style={styles.timeRemainingText}>{timeLeft}</Text>
      < TaskModal />
      </View>
                </View>
    )}
    
const Tasks = ({navigation}) => {
      return (
        <ScrollView>
      <Text style={styles.statisticTitle}>Your teacher has set you the following tasks:</Text>
      {TaskComp('Complete 8 levels of indermediate 6x tables', 0.3, '5d 2hrs')}
      {TaskComp('Complete 5 levels of advanced 5x tables', 0.8, '3d 10hrs')}
      {TaskComp('Score 100% on one level of beginner 4x tables', 0.5, '2hrs')}
      {TaskComp('Score 100% on one level of beginner 4x tables', 0.5, '2hrs')}

      {TaskComp('Score 100% on one level of beginner 4x tables', 0.5, '2hrs')}
      {TaskComp('Score 100% on one level of beginner 4x tables', 0.5, '2hrs')}
      {TaskComp('Score 100% on one level of beginner 4x tables', 0.5, '2hrs')}
      {TaskComp('Score 100% on one level of beginner 4x tables', 0.5, '2hrs')}
      </ScrollView>
);
}

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        backgroundColor: 'white',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
    },
    timeRemainingText: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignContent: 'flex-end',
        justifyContent: 'flex-end',
        fontSize: 22,
    },
    tinyLogo: {
        width: 25,
        height: 25,
        marginHorizontal: 8,
        marginVertical: 1,
      },
    statistic: {
        alignItems: 'center',
        textAlignVertical: 'center',
        height: 20,
        width: 90,
        marginHorizontal: 40,
        marginVertical: 20,
      },
    tasksWrapper: {
        paddingTop: 40,
        paddingHorizontal: 20,
    },
    statisticTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginVertical: 10,
        marginHorizontal: 15,
        marginTop: 15,
        textAlign: 'center',
        fontFamily: "HelveticaNeue",
    },
    ttTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginVertical: 5,
        marginHorizontal: 15,
        fontFamily: "HelveticaNeue",
        color: "#52575D",
    },
    title: {
        fontSize: 34,
        fontWeight: 'bold',
        marginVertical: 10,
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',

    },
    randomContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        borderColor: 'black',
        borderWidth: 1,
        backgroundColor: 'yellow'
    },
    stretch: {
        height: 35,
        width: screenWidth,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
    }
});

export default Tasks;