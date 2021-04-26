import React, {useEffect, useState}  from 'react';
import { Appbar } from 'react-native-paper';
import { StyleSheet, Image, View, Text, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import axios from 'axios';

const LandingHeader = ({person}) => {

  const [streak, updateStreak] = useState(person.data.streak);
  
  const incrementStreak = async(todayISO)=>{
    let newStreak = streak + 1;
    updateStreak(newStreak)
    inputLoginStats(newStreak,todayISO)
  }
  const resetStreak = async(todayISO)=>{
    let newStreak = 0;
    updateStreak(0)
    inputLoginStats(newStreak,todayISO)
  }
  const inputLoginStats = async(noOfDays,lastLoginISO)=>{
    try{
  const lastL = await axios.put('http://34.247.47.193/api/v1/users/lastLogin',{
      "PK": person.PK,
      "lastLogin": lastLoginISO
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
    var loginISO = today.toISOString()
    let date = Math.floor(today.getTime()/(1000*3600*24))*24;
    
    var loginDifference = date - lLogin;
    
    // let check = Math.floor(today.getTime()/(24*3600*1000))-Math.floor(lastLogin.getTime()/(24*3600*1000))
    // console.log(check)
    if(loginDifference == 24){
      
      incrementStreak(loginISO)
      // updateStreak(streak+1)
      console.log('incrementing streak')
    } else if(loginDifference > 24){
      console.log("resetting streak")
      resetStreak(loginISO)
    }
    
    } newStreak()
  },[]);
  return(
    <View style={styles.center}>
 <Appbar style={styles.top}>
   <View style={{justifyContent: 'space-evenly', flexDirection: 'row'}}>

    <Ionicons style={{marginHorizontal: 10}} name="medal" size={50} color="black"></Ionicons>
        <Text style={styles.text}>LVL {person.data.score}</Text>
    <Ionicons name="flame-outline" size={50} color="red"></Ionicons>
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