import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

const difficultyColours = 
{
  0:"#cd7f32",
  1:"#c0c0c0",
  2:"#ffd700",
  3:"#00FF00"
}
const difficultyDict = 
{
  0:"beg",
  1:"int",
  2:"adv",
  3:"adv"
}

const AchievementModal = () => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.uncenteredView}>
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
          <View style={styles.textContainer}><Text style={styles.text}>Awards</Text></View>

            <Text style={styles.modalText}>
                
            <Ionicons name="medal" size={70} color="gold"></Ionicons>
            <Ionicons name="trophy" size={70} color="#cd7f32"></Ionicons>
            <Ionicons name="star" size={70} color="gold"></Ionicons>
            <Ionicons name="medal" size={70} color="gold"></Ionicons>
            <Ionicons name="medal" size={70} color="#cd7f32"></Ionicons>
            <Ionicons name="trophy" size={70} color="#cd7f32"></Ionicons>
            <Ionicons name="trophy" size={70} color="silver"></Ionicons>
            <Ionicons name="star" size={70} color="gold"></Ionicons>
            <Ionicons name="trophy" size={70} color="#cd7f32"></Ionicons>
<Ionicons name="trophy" size={70} color="gold"></Ionicons>
<Ionicons name="star" size={70} color="silver"></Ionicons>


</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      {/* <View style={styles.other}></View> */}
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.textStyle}>Show more...</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: "flex-start",
    marginTop: 3,
    justifyContent: 'center',
    marginHorizontal: '4%',
  },
  uncenteredView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: "flex-start",
    marginTop: 3,
    marginHorizontal: 6,
    justifyContent: 'flex-start'
  },
  other: {
    width:50,
    height:20,
    backgroundColor: 'blue'
  },
  text: {
    fontFamily: "HelveticaNeue",
    color: "#52575D",
    alignContent: 'center',
    fontSize: 35,
    
},
textContainer:
{
height: 50,
width: 200,
justifyContent: 'center',
flexDirection: 'row',
marginVertical: 30

},
  modalView: {
      borderColor: 'gray',
      borderWidth: 5,
    backgroundColor: "#FFF",
    borderRadius: 20,
    padding: 15,
    marginVertical: 120,
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
  button: {
    borderRadius: 20,
    padding: 5,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "black",
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
    marginBottom: 15,
    flexDirection: 'row',
    textAlign: "center",
  }
});

export default AchievementModal;