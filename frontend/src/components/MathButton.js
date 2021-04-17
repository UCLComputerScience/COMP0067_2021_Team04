import { View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import React, {useState}  from 'react';
import { Ionicons, MaterialIcons } from "@expo/vector-icons";


export default function MathButton ({onPress}){
    return(
        <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={onPress}>
            <View style={styles.button}>
            <Ionicons name="send" size={48} color="black" style={{ marginTop: 6, marginLeft: 2 }}></Ionicons>
            </View>
        </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
button: {
   padding: 10,
   backgroundColor: "green",
   flexDirection: 'row',
   width: 80,
   height: 80,
   justifyContent: 'center',
   alignItems: 'center',
   borderRadius: 50,
   marginHorizontal:20,
   marginVertical: 10
    },
    buttonContainer: {
        alignItems: 'flex-end',
    },
})