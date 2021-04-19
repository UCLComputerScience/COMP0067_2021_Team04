import React, { Component } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View, ScrollView, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from 'axios';
const user = require('../screens/LoginScreen').user
console.log(user)

class AvatarMenu extends Component {
  state = {
    modalVisible: false
  };

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  }
  setAvatar = (avatarURL) =>{
    userToUpdate = 'http://localhost:3000/api/v1/users/'+ user.PK; 
    axios.put(userToUpdate,{
      avatar: avatarURL
}).then(res => {
  console.log(res);
  console.log(res.data);
});
  }

  render() {
    const { modalVisible } = this.state;
    return (
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          onBackdropPress={() => this.setModalVisible(!modalVisible )}
          visible={modalVisible}
          style={{height: 300, width: 300}}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            this.setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
          
            <View style={styles.modalView}>
            <ScrollView style = {styles.buttonView}>
              <Text style={styles.modalText}>Select your avatar</Text>
              <View style={styles.profileImage}>
                <Image source={require("../imgs/bee.jpeg")} style={styles.image} resizeMode="center" onPress={this.setAvatar("../imgs/bee.jpeg")}></Image>
              </View>
              
              <View style={styles.profileImage}>
                <Image source={require("../imgs/butterfly.jpeg")} style={styles.image} resizeMode="center" onPress={this.setAvatar("../imgs/butterfly.jpeg")}></Image>
              </View>
              <View style={styles.profileImage}>
                <Image source={require("../imgs/butterfly2.jpeg")} style={styles.image} resizeMode="center"></Image>
              </View>
              <View style={styles.profileImage}>
                <Image source={require("../imgs/centipede.jpeg")} style={styles.image} resizeMode="center"></Image>
              </View>
              <View style={styles.profileImage}>
                <Image source={require("../imgs/grasshopper.jpeg")} style={styles.image} resizeMode="center"></Image>
              </View>
              <View style={styles.profileImage}>
                <Image source={require("../imgs/ladybird.jpeg")} style={styles.image} resizeMode="center"></Image>
              </View>
              <View style={styles.profileImage}>
                <Image source={require("../imgs/scorpion.jpeg")} style={styles.image} resizeMode="center"></Image>
              </View>
              <View style={styles.profileImage}>
                <Image source={require("../imgs/snail.jpeg")} style={styles.image} resizeMode="center"></Image>
              </View>
              <View style={styles.profileImage}>
                <Image source={require("../imgs/spider.jpeg")} style={styles.image} resizeMode="center"></Image>
              </View>
              <View style={styles.profileImage}>
                <Image source={require("../imgs/worm.jpeg")} style={styles.image} resizeMode="center"></Image>
              </View>
              <View style={styles.profileImage}>
                <Image source={require("../imgs/worm2.jpeg")} style={styles.image} resizeMode="center"></Image>
              </View>
              <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => this.setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Close</Text>
            </Pressable>
              </ScrollView>
            </View>
          
          </View>
        </Modal>
        <Ionicons name="ios-add" size={48} onPress={() => this.setModalVisible(true)} color="#DFD8C8" ></Ionicons>
      </View>
    );
  }
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

export default AvatarMenu;