import React, { useState }  from 'react';
import { Alert, Button, Platform, SafeAreaView, StatusBar, StyleSheet, Text, View, ScrollView } from 'react-native';
import Progress from '../components/ProgressBar';
// import * as Progresser from 'react-native-progress';
import Table from '../components/Datatable';
import LineGraph from '../components/LineGraph';
import ProgressRing from '../components/ProgressRing';
// import Pie from '../src/components/PieChart';


const Tasks = ({navigation}) => {
      return (
        <View style={styles.container}>
        <ScrollView>
      <Text style={styles.statisticTitle}>Your teacher has set you the following tasks:</Text>
      <Text style={styles.ttTitle}>Complete 8 levels of indermediate 6x tables</Text>
      <Progress />
      <Text style={styles.ttTitle}>Complete 5 levels of advanced 5x tables</Text>
      <Progress />
      <Text style={styles.ttTitle}>Score 100% on one level of beginner 4x tables</Text>
      <Progress />
      <Text> </Text>
      <Text> </Text>
      <Text> </Text>
      </ScrollView>
        </View> 
);
}


const styles = StyleSheet.create ({
    container: {
        flex: 1,
        backgroundColor: '#E8EAED',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
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
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 10
    },
    ttTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginVertical: 10
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
        height: 30,
        width: 200,
        backgroundColor: 'blue'
    }
});

export default Tasks;