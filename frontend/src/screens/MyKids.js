import React, { Component, useState, useEffect, useReducer } from "react";
import { Alert, StyleSheet, Text, View, SafeAreaView, Image, ScrollView, TouchableHighlight, Pressable, TouchableOpacity } from "react-native";
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell }  from 'react-native-table-component';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import StatsScreen from './StatsScreen';

const MyKids =({navigation}) => {
    const [user, userLoad] = useState();
    useEffect(()=>{
        async function fetchData (){
    
    try {
      const value = await AsyncStorage.getItem('user');
      if (value !== null) {
        // We have data!!
        let result = JSON.parse(value)
        
        userLoad(result)
        
      }
    } catch (error) {
      console.log("error")
    }
    }
    
    fetchData()
    
    },[]);
    const seeKidsStats = (studentID)=>{
        if(studentID){
        navigation.navigate("Student Data",{
            userID: studentID
        })
    }
}
    return( seeKidsStats(user.GSI1))
}   
