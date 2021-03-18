import React, { useState }  from 'react';
import { Alert, Button, Platform, SafeAreaView, StatusBar, StyleSheet, Text, View, ScrollView } from 'react-native';
import Progress from '../components/ProgressBar';
// import * as Progresser from 'react-native-progress';
import Table from '../components/Datatable';
import LineGraph from '../components/LineGraph';
import ProgressRing from '../components/ProgressRing';
// import Pie from '../src/components/PieChart';

class Stats extends React.Component {
    render() {
    return (
        <View style={styles.container}>
            <ScrollView>
          <Text style={styles.statisticTitle}>2x timestable</Text>
          <Text>Progress Bar</Text>
          <Progress />
          <LineGraph />
          <Table />
          <Text style={styles.statisticTitle}>3x timestable</Text>
          <Text>Progress Bar</Text>
          <Progress />
          <Text style={styles.statisticTitle}>4x timestable</Text>
          <Text>Progress Bar</Text>
          <Progress />
          <ProgressRing />
          <Text style={styles.statisticTitle}>5x timestable</Text>
          <Text>Progress Bar</Text>
          <Progress />
          <Text style={styles.statisticTitle}>6x timestable</Text>
          <Table />
          <Text>Progress Bar</Text>
          <Progress />
          {/* <Pie /> */}
          <Text style={styles.statisticTitle}>7x timestable</Text>
          <Text>Progress Bar</Text>
          <Progress />
          <Text> </Text>
          <Text> </Text>
          <Text> </Text>
          <Button
          title="Leaderboards"
          onPress = { () => alert('Leaderboards') } />
          </ScrollView>
            </View> 
    );
  }
}

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        backgroundColor: '#E8EAED',
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
    addText: {}
});

export default Stats;