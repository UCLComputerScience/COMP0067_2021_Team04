import React, { useState }  from 'react';
import {Component} from 'react';
import { Dimensions } from "react-native";
import { Alert, Button, Platform, SafeAreaView, StatusBar, StyleSheet, Text, View, ScrollView } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Progress from '../components/ProgressBar';
// import * as Progresser from 'react-native-progress';
import Table from '../components/Datatable';
import LineGraph from '../components/LineGraph';
import ProgressRing from '../components/ProgressRing';
// import Pie from '../src/components/PieChart';
import TaskModal from '../components/TasksModal';
import PropTypes from 'prop-types';


const screenWidth = Dimensions.get("window").width;


const Tasks = ({navigation}) => {
      return (
        <View style={styles.container}>
        <ScrollView>
      <Text style={styles.statisticTitle}>Your teacher has set you the following tasks:</Text>
      <Text style={styles.ttTitle}>Complete 8 levels of indermediate 6x tables</Text>
      <Progress  completion={0.3}/>
      <View style={styles.stretch}>
      <MaterialCommunityIcons name="timer-sand-full" color={'gray'} size={30} style={styles.tinyLogo} />
      <Text style={styles.timeRemainingText}>(5d 2h left)</Text>
      < TaskModal />
      </View>
      <Text style={styles.ttTitle}>Complete 5 levels of advanced 5x tables</Text>
      <Progress completion={0.5} /><View style={styles.stretch}>
      <MaterialCommunityIcons name="timer-sand-full" color={'gray'} size={30} style={styles.tinyLogo} />
      <Text style={styles.timeRemainingText}>(2d 18h left)</Text>
      < TaskModal />
      </View>
      <Text style={styles.ttTitle}>Score 100% on one level of beginner 4x tables</Text>
      <Progress  completion={0.8}/><View style={styles.stretch}>
      <MaterialCommunityIcons name="timer-sand-full" color={'gray'} size={30} style={styles.tinyLogo} />
      <Text style={styles.timeRemainingText}>(6h left)</Text>
      < TaskModal />
      </View>
      </ScrollView>
        </View> 
);
}

class TasksScreen extends Component{
    static propTypes = {
        CompletionPercentage: PropTypes.number.isRequired,
    };
    render(){
        return( 
            <Tasks />
          )
        } 
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