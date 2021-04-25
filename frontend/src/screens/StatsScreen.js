import React, { useEffect, useState }  from 'react';
import { Alert, Button, Platform, SafeAreaView, StatusBar, StyleSheet, Text, View, ScrollView } from 'react-native';
import Progress from '../components/ProgressBar';
import Table from '../components/Datatable';
import LineGraph from '../components/LineGraph';
import ProgressRing from '../components/ProgressRing';
// import Pie from '../src/components/PieChart';
import Rocket from '../animations/Rocket';
import PropTypes from 'prop-types';
import  {Component} from 'react';
import axios from 'axios';


const Stats = ({navigation, userID}) => {
    const [studentsData, getStudentData] = useState();
    const [user, userLoad] = useState();
    
    useEffect(()=>{
        async function getStats(){
        if(userID){
            try{
                let studentData = await axios.get('http://localhost:3000/api/v1/testStatistics/indepth/' + userID);
                getStudentData(studentData);
                console.log(studentsData)
            } catch{
                console.log('Error Loading Students Stats')
            }
        }else{
            try {
                const value = await AsyncStorage.getItem('user');
                if (value !== null) {
                  // We have data!!
                  let result = JSON.parse(value)
                  let studentDetails = 'http://localhost:3000/api/v1/testStatistics/indepth/' + result.PK;
                  let studentData = await axios.get(studentDetails);
                getStudentData(studentData);
                console.log(studentsData);
                }
              } catch (error) {
                console.log("error")
              }
              }
        }
        getStats()},[])
    return (
      <View style={styles.container}>
      <ScrollView>
      {/* <Rocket /> */}
    <Text style={styles.statisticTitle}>2x timestable</Text>
    <Progress completion={0.3}/>
    <LineGraph />
    <Table />
    <Text style={styles.statisticTitle}>3x timestable</Text>
    <Progress completion={0.65}/>
    <Text style={styles.statisticTitle}>4x timestable</Text>
    <Progress completion={0.3}/>
    <ProgressRing />
    <Text style={styles.statisticTitle}>5x timestable</Text>
    <Progress completion={1}/>
    <Text style={styles.statisticTitle}>6x timestable</Text>
    <Table />
    <Progress completion={0.2}/>
    {/* <Pie /> */}
    <Text style={styles.statisticTitle}>7x timestable</Text>
    <Progress completion={0.5}/>
    <Text> </Text>
    <Text> </Text>
    <Text> </Text>
    <Button
    title="Leaderboards"
    onPress = { () => navigation.navigate('Load') } />
    </ScrollView>
      </View> 
      );
};

class StatsScreen extends Component{
    static propTypes = {
        CompletionPercentage: PropTypes.number.isRequired,
    };
    render(){
        return( 
            <Stats />
          )
        } 
        }


const styles = StyleSheet.create ({
    container: {
        flex: 1,
        backgroundColor: 'white',
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
        fontSize: 25,
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
    addText: {}
});

export default Stats;