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
            <SettingsButton 
                  option={'Dark Mode'}
                  isDisabled = {false}
                  onPress={() => Alert.alert('Hello')}
                                  />
            <SettingsButton 
            option={'Logout'}
            isDisabled = {false}
            onPress={() => Alert.alert(hello)}
            // onPress={() => navigation.navigate('SignUp')}
            />
            <SettingsButton 
            option={'Cancel'}
            isDisabled = {false}
            onPress={() => setModalVisible(!modalVisible)}
            />
            </View>
          </View>
        </View>
      </Modal>
      <TouchableHighlight onPress={() => setModalVisible(true)}>
      <Ionicons name="cog" size={40} color="#52575D"></Ionicons>
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
    marginTop: 120,
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
    marginBottom: 10,
    textAlign: "center"
  }
});

export default SettingsModal;