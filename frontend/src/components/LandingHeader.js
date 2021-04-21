import * as React from 'react';
import { Appbar } from 'react-native-paper';
import { StyleSheet, Image, View, Text, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

const LandingHeader = () => (
    
 <Appbar style={styles.top}>
   <View style={{justifyContent: 'space-evenly', flexDirection: 'row'}}>
     <TouchableOpacity onPress = { () => alert('Award!') } >

    <Ionicons style={{marginHorizontal: 10}} name="medal" size={50} color="black"></Ionicons>
    </TouchableOpacity>
        <Text style={styles.text}>LVL 26</Text>
        <TouchableOpacity onPress = { () => alert('Streak!') } >
    <Ionicons name="flame-outline" size={50} color="red"></Ionicons>
    </TouchableOpacity>
    <Text style={styles.text}>5 DAY STREAK</Text>
    </View>
  </Appbar>
 );

const styles = StyleSheet.create({
  top: {
    backgroundColor: '#FFD700',
    color: '#FFD700',
    borderRadius: 25,
    padding: 3
  },
text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 10,
    marginVertical: 15
},
});

export default LandingHeader;