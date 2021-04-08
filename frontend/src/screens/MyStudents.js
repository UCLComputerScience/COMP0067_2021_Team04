import React, { Component } from "react";
import { Alert, StyleSheet, Text, View, SafeAreaView, Image, ScrollView, TouchableHighlight, Pressable } from "react-native";
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell }  from 'react-native-table-component';


class MyStudents extends Component{
    constructor(props){
        super(props);
        this.state = {form: '4B',
            tableHead: ['Student', 'Timestables Mastered', 'Pending Assignments'],
            widthArr: [133,133,133]
            
          }
}
    changeClass = (students)=>{
        Alert.alert(
            "Alert Title",
            "Class changed",)
        this.setState({
            form: students
          })
    }
    render(){
        const state = this.state;
    const data = [];
    for (let i = 0; i < 30; i += 1) {
      const dataRow = [];
      for (let j = 0; j < 9; j += 1) {
        dataRow.push(`${i}${j}`);
      }
      data.push(dataRow);
    }
        return(
            <View style = {styles.container}>
                <View style = {styles.classOptionsContainer}>
                    <Pressable
                    style={styles.classOptionButton}
                    onPress={() => this.changeClass('4B')}
                    >
                        <Text style = {styles.buttonText}>4B</Text>

                    </Pressable>
                    <Pressable
                    style={styles.classOptionButton}
                    onPress={() => this.changeClass('5B')}
                    >
                        <Text style = {styles.buttonText}>5B</Text>

                    </Pressable>
                    <Pressable
                    style={styles.classOptionButton}
                    onPress={() => this.changeClass('6B')}
                    >
                        <Text style = {styles.buttonText}>6B</Text>

                    </Pressable>
                </View>
                <View style = {styles.stats}>
                    <Text style={styles.statsText}>Class Stats</Text>
                    <View style = {{bottom:  60, left: 20}}>
                        <Text>Pending Assignments: 10 from 4 students</Text>
                        <Text>Weeks Average Time: 65 minutes</Text>
                    </View>
                </View>
                <View style={styles.tableView}>
                    <ScrollView horizontal={true}>
                        <View style = {styles.table}>
                            <Table borderStyle={{borderColor: '#C1C0B9'}}>
                            <Row data={state.tableHead} widthArr={state.widthArr} style={styles.head} textStyle={styles.text}/>
                            </Table>
                            <ScrollView style={styles.dataWrapper}>
                            <Table borderStyle={{borderColor: '#C1C0B9'}}>
                                {
                                data.map((dataRow, index) => (
                                    <Row
                                    key={index}
                                    onPress={() => this.changeClass('5B')}
                                    data={dataRow}
                                    widthArr={state.widthArr}
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