import React, { Component, useState, useEffect } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View, ScrollView, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';



export default function AvatarMenu ({func}) {
  const [user, userLoad] = useState({})
  const [modalVisible, modalChange] = useState(false)
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
  
  console.log("errorasf")
}
}

fetchData()

},[]);

    
  
  

 const setModalVisible = (visible) => {
    modalChange(visible);
  }
  
  
 const setAvatar = (avatarNo) =>{
  func(avatarNo)
  console.log(user.PK)
    var userToUpdate = 'http://54.171.167.5/api/v1/users/avatar'; 
    axios.put(userToUpdate,{
      PK: user.PK,
      Avatar: avatarNo

}).then(res => {
  console.log(res);
  console.log(res.data);
});

  
  
  const newAvatar = () => {
      AsyncStorage.mergeItem(
        'user',
        JSON.stringify(user),
      );
      
    }
  newAvatar()
  
    
  }
    
  return (
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          onBackdropPress={() => setModalVisible(!modalVisible )}
          visible={modalVisible}
          style={{height: 300, width: 300}}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
          
            <View style={styles.modalView}>
            <ScrollView style = {styles.buttonView}>
              <Text style={styles.modalText} >Select your avatar</Text>
              <TouchableOpacity style={styles.profileImage} onPress={()=>{setAvatar(1)}}>
                <Image source={require("../imgs/bee.jpeg")} style={styles.image} resizeMode="center"></Image>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.profileImage} onPress={()=>setAvatar(2)}>
                <Image source={require("../imgs/butterfly.jpeg")} style={styles.image} resizeMode="center" ></Image>
              </TouchableOpacity>
              <TouchableOpacity style={styles.profileImage} onPress={()=>setAvatar(3)}>
                <Image source={require("../imgs/butterfly2.jpeg")} style={styles.image} resizeMode="center"></Image>
              </TouchableOpacity>
              <TouchableOpacity style={styles.profileImage} onPress={()=>setAvatar(4)}>
                <Image source={require("../imgs/centipede.jpeg")} style={styles.image} resizeMode="center"></Image>
              </TouchableOpacity>
              <TouchableOpacity style={styles.profileImage} onPress={()=>setAvatar(5)}>
                <Image source={require("../imgs/grasshopper.jpeg")} style={styles.image} resizeMode="center"></Image>
              </TouchableOpacity>
              <TouchableOpacity style={styles.profileImage} onPress={()=>setAvatar(6)}>
                <Image source={require("../imgs/ladybird.jpeg")} style={styles.image} resizeMode="center"></Image>
              </TouchableOpacity>
              <TouchableOpacity style={styles.profileImage} onPress={()=>setAvatar(7)}>
                <Image source={require("../imgs/scorpion.jpeg")} style={styles.image} resizeMode="center"></Image>
              </TouchableOpacity>
              <TouchableOpacity style={styles.profileImage} onPress={()=>setAvatar(8)}>
                <Image source={require("../imgs/snail.jpeg")} style={styles.image} resizeMode="center"></Image>
              </TouchableOpacity>
              <TouchableOpacity style={styles.profileImage} onPress={()=>setAvatar(9)}>
                <Image source={require("../imgs/spider.jpeg")} style={styles.image} resizeMode="center"></Image>
              </TouchableOpacity>
              <TouchableOpacity style={styles.profileImage} onPress={()=>setAvatar(10)}>
                <Image source={require("../imgs/worm.jpeg")} style={styles.image} resizeMode="center"></Image>
              </TouchableOpacity>
              <TouchableOpacity style={styles.profileImage} onPress={()=>setAvatar(11)}>
                <Image source={require("../imgs/worm2.jpeg")} style={styles.image} resizeMode="center"></Image>
              </TouchableOpacity>
              <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Close</Text>
            </Pressable>
              </ScrollView>
            </View>
          
          </View>
        </Modal>
        <Ionicons name="ios-add" size={48} onPress={() => setModalVisible(true)} color="#DFD8C8" ></Ionicons>
      </View>
    );
  }


const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  buttonView: {
    
    backgroundColor: "white",
    
    position: 'relative',
    flexDirection: 'column',
    flex: 2,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    width: 100,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonChoice: {
    backgroundColor: "#2196F3",
    
  },
  image: {
    flex: 1,
    height: undefined,
    width: undefined
},
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 100,
    overflow: "hidden",
    margin: 20
},
  buttonClose: {
    backgroundColor: "#FF0000",
    left: 50
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

