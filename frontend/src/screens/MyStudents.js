import React, { Component, useState, useEffect, useReducer } from "react";
import { Alert, StyleSheet, Text, View, SafeAreaView, Image, ScrollView, TouchableHighlight, Pressable } from "react-native";
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell }  from 'react-native-table-component';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";

// call students by class
// make a array of basic student objects
// make link to my stats page

const MyStudents =({navigation}) => { 
    const [formData, changeForm] = useState([]);
    const [formIdsbyName, getFormIds] = useState();
    const [studentNames, updateStudentsNames] = useState();
    const [pendingAssignments, updatePendingAssignments] = useState();
    const [studentScores, updateStudentsScores] = useState()
    const [forms, getForms] = useState([])
    const tableHead = ['Student', 'Pending Assignments', 'Score'];
    const widthArr = [133,133,133]
    useEffect(()=>{async function getClasses(){
        try{
            let result = await axios.get('http://localhost:3000/api/v1/classes/getClasses/user_gavinteacher')
            let classArray = result.data.Items;
            let info = [];
            let sets = [];
            let classIdbyName = {};
            let noOfClasses = classArray.length;
    
            for (var i = 0; i < noOfClasses; i++) {
                info.push(classArray[i].PK)
                sets.push(classArray[i].data.name)
                classIdbyName[classArray[i].data.name] = classArray[i].PK;
            }
            getForms(sets)
            // getStudents(info[0])
            getFormIds(classIdbyName)
            if(classIdbyName[sets[0]]){
            changeClass(classIdbyName[sets[0]])
            }
        }
        catch{
            console.log('no classes found for this teacher')
        }
        }
        getClasses()
    },[]
    )
        


    const changeClass = async (classID)=>{
        try{
        let address = 'http://34.247.47.193/api/v1/users/' + classID;
        console.log(address)
        let students = await axios.get(address);
        
         let result = students;
         console.log(result)
         
        let sNames = [];
        let sScores = [];
        let sPending = [];
        
        for (var i =0; i < result.length; i++){
            let fullName = result[i].data.firstName + ' ' + result[i].data.lastName
            sNames.push(fullName);
            sScores.push(result[i].data.score);
            sPending.push(result[i].data.pendingAssignments);
        }
        console.log('here')
        console.log(sNames)
        updateStudentsNames(sNames)
        updatePendingAssignments(sScores)
        updateStudentsScores(sPending)
        var data = [];
    for (let i = 0; i < studentNames.length; i += 1) {
      const dataRow = [];
      
      dataRow.push(studentNames[i], pendingAssignments[i], studentScores[i]);
      
      data.push(dataRow);

    }
    changeForm(data)
    }catch{
        console.log("Couldn't load students")
    }}

    const classButton = (set) => {
        
        return (<Pressable
                    style={styles.classOptionButton}
                    onPress={() => changeClass(formIdsbyName[set])}
                    >
                        <Text style = {styles.buttonText}>{set}</Text>

                    </Pressable>
        )}

    
    
        return(
            <View style = {styles.container}>
                <View style = {styles.classOptionsContainer}>
                    {forms.map(classButton)}
                </View>
                <View style = {styles.stats}>
                    <Text style={styles.statsText}>Class Stats</Text>
                    <View style = {{bottom:  60, left: 20}}>
                        <Text>Class Key: </Text>
                        <Text>Class Size: </Text>
                        <Text>Pending Assignments: 10 from 4 students</Text>
                    </View>
                </View>
                <View style={styles.tableView}>
                    <ScrollView horizontal={true}>
                        <View style = {styles.table}>
                            <Table borderStyle={{borderColor: '#C1C0B9'}}>
                            <Row data={tableHead} widthArr={widthArr} style={styles.head} textStyle={styles.text}/>
                            </Table>
                            <ScrollView style={styles.dataWrapper}>
                            <Table borderStyle={{borderColor: '#C1C0B9'}}>
                                {
                                formData.map((datarow, index) => (
                                    <Row
                                    key={index}
                                    onPress={() => console.log('being pressed')}
                                    data={datarow}
                                    widthArr={widthArr}
                                    style={[styles.row, index%2 && {backgroundColor: '#ffffff'}]}
                                    textStyle={styles.text}
                                    />
                                ))
                                }
                            </Table>
                            </ScrollView>
                        </View>
                    </ScrollView>
                </View>
            </View>
        )
    }



const styles = StyleSheet.create({

    container: {
        alignItems: 'center',
        position: 'relative',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        backgroundColor: '#FFFFFF',
        display: 'flex',
        height: 820
        
    },
    statsText:{
        fontSize: 25
    },

    classOptionsContainer: {

        alignItems: 'center',
        position: 'relative',
        flexDirection: 'row',
        justifyContent: 'center',
       
        
        
        
    },
    classOptionButton: {
        
        borderColor: '#000000',
        borderWidth: 1,
        borderStyle: 'solid',
        height: 50,
        flex: 1
        
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 30
    },
    HeadStyle: { 
        height: 50,
        alignContent: "center",
        backgroundColor: '#FFFFFF'
      },
    table:{
        height: 400
    },
    tableView:{
        height: 550,
        flex: 1,
        bottom: 100
    },
    stats:{
        flex:1,
        justifyContent: 'space-evenly',
        right: 50,
        bottom: 45
    },
   
    
    TableText: { 
        margin: 10,
        fontSize: 15,
        fontFamily: "HelveticaNeue"
      },
    tableContainer: {
        flex: 3, 
        padding: 16, 
        paddingTop: 30, 
        backgroundColor: '#ffffff',
        height: 500

        
      },
      head: { 
        height: 50, 
        backgroundColor: '#6F7BD9' 
      },
      text: { 
        textAlign: 'center', 
        fontWeight: '200',
        fontSize: 15,
        fontFamily: "HelveticaNeue"
      },
      dataWrapper: { 
        marginTop: -1 
      },
      row: { 
        height: 40, 
        backgroundColor: '#F7F8FA' 
      }
      }
    
    )
export default MyStudents;