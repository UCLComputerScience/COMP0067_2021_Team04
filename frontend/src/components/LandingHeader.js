import React, {useEffect, useState}  from 'react';
import { Appbar } from 'react-native-paper';
import { StyleSheet, Image, View, Text, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import axios from 'axios';

const LandingHeader = ({person}) => {

  const [streak, updateStreak] = useState(person.data.streak);
  console.log(streak)
  const incrementStreak = async()=>{
    let newStreak = streak + 1;
    updateStreak(newStreak)
    inputLoginStats(newStreak)
  }
  const resetStreak = async()=>{
    let newStreak = 0;
    updateStreak(0)
    inputLoginStats(newStreak)
  }
  const inputLoginStats = async(noOfDays)=>{
    console.log(noOfDays)
    try{
  const lastL = await axios.put('http://34.247.47.193/api/v1/users/lastLogin',{
      "PK": person.PK,
      "lastLogin": "2021-04-24"
    })
  const res = await axios.put('http://34.247.47.193/api/v1/users/streak',{
      "PK": person.PK,
      "streak": noOfDays
    });
  }catch{
      console.log("Error Loading Streaks")
    }
  }
  useEffect(()=>{
    async function newStreak (){

    const lastLogin = new Date(person.data.lastLogin);
    
    const lLogin = Math.floor((new Date(lastLogin)).getTime()/(1000*3600*24))*24;
    
    var today = new Date();
    
    let date = Math.floor(today.getTime()/(1000*3600*24))*24;
    
    var loginDifference = date - lLogin;
    
    // let check = Math.floor(today.getTime()/(24*3600*1000))-Math.floor(lastLogin.getTime()/(24*3600*1000))
    // console.log(check)
    if(loginDifference == 24){
      
      incrementStreak()
      // updateStreak(streak+1)
      console.log('incrementing streak')
    } else if(loginDifference > 24){
      console.log("resetting streak")
      resetStreak()
    }
    
    } newStreak()
  },[]);
  return(
    <View style={styles.center}>
 <Appbar style={styles.top}>
   <View style={{justifyContent: 'space-evenly', flexDirection: 'row'}}>
     <TouchableOpacity onPress = { () => alert('Award!') } >

    <Ionicons style={{marginHorizontal: 10}} name="medal" size={50} color="black"></Ionicons>
    </TouchableOpacity>
        <Text style={styles.text}>LVL {person.overall.score}</Text>
        <TouchableOpacity onPress = { () => alert('Streak!') } >
    <Ionicons name="flame-outline" size={50} color="red"></Ionicons>
    </TouchableOpacity>
    <Text style={styles.text}>STREAK: {streak}</Text>
    </View>
  </Appbar>
  </View>
  )
};

const styles = StyleSheet.create({
  top: {
    backgroundColor: '#FFD700',
    color: '#FFD700',
    borderRadius: 25,
    padding: 3,
    marginTop:80,
    width: 350
  },
  center: {
    justifyContent: 'center',
    backgroundColor: 'white',
    flex: 0.5,
    flexDirection: 'row',
    marginBottom: 10,
    marginTop: -30
  },
text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 10,
    marginVertical: 15
},
});

export default LandingHeader;