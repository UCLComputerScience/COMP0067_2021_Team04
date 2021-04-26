import React, { useState } from "react";
import { StyleSheet, Text, View, SafeAreaView, Image, ScrollView, TouchableHighlight, Pressable, Modal, Button, Alert} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import PropTypes from 'prop-types';
import SettingsButton from '../components/SettingsButton';


const SettingsModal = () => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
        
            <View style={styles.central}>
            <Text style={styles.modalText}>Select any of the timestable to begin your journey.</Text>
            <Text style={styles.modalText}>To get some practice click on the red shuffle button at the bottom before taking any tests</Text>
            <Text style={styles.modalText}>Compete with friends to gain award by clicking the blue challenge button</Text>
            <Text style={styles.modalText}>The green bonus button will start a fun addition game to work on your other  skills and become an all-round maths champion!</Text>

            </View>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <TouchableHighlight onPress={() => setModalVisible(true)}>
      <Ionicons name="help-circle" size={40} color="black"></Ionicons>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 3,
  },
  central: {
    flex:1,
    justifyContent: 'space-evenly'
  },
  settingButton: {
    marginTop: 100
  },
  modalView: {
    margin: 40,
    marginTop: 80,
    backgroundColor: "lightgrey",
    borderRadius: 20,
    padding: 80,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 2
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "blue",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 5,
    textAlign: "center",
    fontSize:13
  }
});

export default SettingsModal;