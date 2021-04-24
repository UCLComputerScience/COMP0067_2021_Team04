import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";
import Rocket from '../animations/Rocket';


const TestOverModal = ({score, accuracy, total, onPress, gameEnd, timestable, navigation}) => {
  const [modalVisible, setModalVisible] = useState(true);
  const [statisticsSent, sendStatistics] = useState(0)

  useEffect(()=>{
    if(gameEnd === 'GAME_OVER' && statisticsSent == 0){
      try{axios.post('http://34.247.47.193/api/v1/testStatistics',
      {"PK": user.PK,
      "timestable": timestable,
      "SK": user.SK,
      "GSI1": user.GSI1,
      data:{
        "timeTaken": 100,
        "questions": total,
        "correctQuestions": score
      }
    }
      )
    sendStatistics(1)}
  catch {
    console.log('Statistics not sent')
  }
  }
  })

  return (

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
            <Text style={styles.titleText}>Test Over!</Text>
            <Text style={styles.modalText}>Well done you scored: {score}/{total}</Text>
            <Text style={styles.modalText}>You had an accuracy of: {accuracy}%</Text>

            {/* <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Close</Text>
            </Pressable> */}
                     <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={onPress}
            >
              <Text style={styles.textStyle}>Do something</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Close</Text>
            </Pressable>
            {/* <Rocket /> */}
          </View>
        </View>
      </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    // marginEnd: -50
  },
  modalView: {
    margin: 10,
    backgroundColor: "lightgrey",
    borderRadius: 20,
    padding: 45,
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
    elevation: 2,
    marginVertical:10
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
    marginBottom: 20,
    textAlign: "center",
    fontSize: 20
  },
  titleText: {
    marginBottom: 20,
    textAlign: "center",
    fontSize: 40,
  },
});

export default TestOverModal;