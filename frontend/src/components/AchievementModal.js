import React, {useState, useEffect} from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View,TouchableOpacity } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import Award from '../components/Award';


const AchievementModal = () => {

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

const [user, userLoad] = useState({
  GSI1: "class_2ec278cf-1a35-4746-911b-1a360c83dbb5",
  PK: "user_mathsqueen",
  //hardcoded
  data:  {
    "avatar": 7,
    "firstName": "Andrew",
    "hashPassword": "$2a$10$E71aiun83wdz5/FY374JU.e1abBYyA0VwV/C.unxGKZ2CXaZSXB6i",
    "lastName": "O'Connell",
    "pendingAssignments": 16,
    "role": "student",
    "secret": "studentSecret",
    "streak": 0,
    "lastLogin": "2021-04-10"
  },
  eightx:  {
    "accuracy": 0,
    "state": "beginner",
    "testsTaken": 0,
    "timeTaken": 0,
  },
  elevenx:  {
    "accuracy": 0,
    "state": "beginner",
    "testsTaken": 0,
    "timeTaken": 0,
  },
  "expiresIn": 168,
  fivex:  {
    "accuracy": 0,
    "state": "beginner",
    "testsTaken": 0,
    "timeTaken": 0,
  },
  fourx: {
    "accuracy": 0,
    "state": "beginner",
    "testsTaken": 0,
    "timeTaken": 0,
  },
  "message": "You have successfully logged in.",
  ninex:  {
    "accuracy": 0,
    "state": "beginner",
    "testsTaken": 0,
    "timeTaken": 0,
  },
  onex:  {
    "accuracy": 0,
    "state": "beginner",
    "testsTaken": 0,
    "timeTaken": 0,
  },
  "overall":  {
    "accuracy": 0,
    "testsTaken": 0,
    "timeTaken": 0,
  },
  "role": "student",
  sevenx:  {
    "accuracy": 0,
    "state": "beginner",
    "testsTaken": 0,
    "timeTaken": 0,
  },
  sixx:  {
    "accuracy": 0,
    "state": "beginner",
    "testsTaken": 0,
    "timeTaken": 0,
  },
  "success": true,
  tenx:  {
    "accuracy": 0,
    "state": "beginner",
    "testsTaken": 0,
    "timeTaken": 0,
  },
  threex:  {
    "accuracy": 0,
    "state": "beginner",
    "testsTaken": 0,
    "timeTaken": 0,
  },
  twox:  {
    "accuracy": 0,
    "state": "beginner",
    "testsTaken": 0,
    "timeTaken": 0,
  },
  twelvex:  {
    "accuracy": 0,
    "state": "beginner",
    "testsTaken": 0,
    "timeTaken": 0,
  },
})

useEffect(()=>{
  async function fetchData (){

try {
const value = await AsyncStorage.getItem('user');
if (value !== null) {
  // We have data!!
  let result = JSON.parse(value)
  
  userLoad(result)
  setLogin(1)
}
} catch (error) {
console.log("error")
}
}

fetchData()

},[]);

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
                <Award isLocked={true} awardColor={'gold'} lockedMessage={'To unlock:'} awardSubMessage={'Master 2x table'} awardName={'star'} isDisabled={true} awardMessage={'Hello'} />
                <Award isLocked={true} awardColor={'gold'} lockedMessage={'To unlock:'} awardSubMessage={'Master 3x table'} awardName={'star'} isDisabled={true} awardMessage={'Hello'} />
                <Award isLocked={true} awardColor={'gold'} lockedMessage={'To unlock:'} awardSubMessage={'Master 4x table'} awardName={'star'} isDisabled={true} awardMessage={'Hello'} />
                <Award isLocked={true} awardColor={'gold'} lockedMessage={'To unlock:'} awardSubMessage={'Master 5x table'} awardName={'star'} isDisabled={true} awardMessage={'Hello'} />
                <Award isLocked={true} awardColor={'gold'} lockedMessage={'To unlock:'} awardSubMessage={'Master 6x table'} awardName={'star'} isDisabled={true} awardMessage={'Hello'} />
                <Award isLocked={true} awardColor={'gold'} lockedMessage={'To unlock:'} awardSubMessage={'Master 7x table'} awardName={'star'} isDisabled={true} awardMessage={'Hello'} />
                <Award isLocked={true} awardColor={'gold'} lockedMessage={'To unlock:'} awardSubMessage={'Master 8x table'} awardName={'star'} isDisabled={true} awardMessage={'Hello'} />
                <Award isLocked={true} awardColor={'gold'} lockedMessage={'To unlock:'} awardSubMessage={'Master 9x table'} awardName={'star'} isDisabled={true} awardMessage={'Hello'} />
                <Award isLocked={true} awardColor={'gold'} lockedMessage={'To unlock:'} awardSubMessage={'Master 10x table'} awardName={'star'} isDisabled={true} awardMessage={'Hello'} />
                <Award isLocked={true} awardColor={'gold'} lockedMessage={'To unlock:'} awardSubMessage={'Master 11x table'} awardName={'star'} isDisabled={true} awardMessage={'Hello'} />
                <Award isLocked={true} awardColor={'gold'} lockedMessage={'To unlock:'} awardSubMessage={'Master 12x table'} awardName={'star'} isDisabled={true} awardMessage={'Hello'} />
                <Award isLocked={true} awardColor={'gold'} lockedMessage={'To unlock:'} awardSubMessage={'Spend over 20 hours on the app'} awardName={'medal'} isDisabled={true} awardMessage={'Hello'} />
                <Award isLocked={true} awardColor={'gold'} lockedMessage={'To unlock:'} awardSubMessage={'Win 3 challenges'} awardName={'medal'} isDisabled={true} awardMessage={'Hello'} />
                <Award isLocked={true} awardColor={'gold'} lockedMessage={'To unlock:'} awardSubMessage={'Top the leaderboard'} awardName={'medal'} isDisabled={true} awardMessage={'Hello'} />
                <Award isLocked={true} awardColor={'gold'} lockedMessage={'To unlock:'} awardSubMessage={'Build a 3 login streak'} awardName={'medal'} isDisabled={true} awardMessage={'Hello'} />
                <Award isLocked={true} awardColor={'gold'} lockedMessage={'To unlock:'} awardSubMessage={'Build a 5 login streak'} awardName={'medal'} isDisabled={true} awardMessage={'Hello'} />
                <Award isLocked={true} awardColor={'gold'} lockedMessage={'To unlock:'} awardSubMessage={'Build a 10 login streak'} awardName={'medal'} isDisabled={true} awardMessage={'Hello'} />
                <Award isLocked={true} awardColor={'gold'} lockedMessage={'To unlock:'} awardSubMessage={'Master every single times table'} awardName={'trophy'} isDisabled={true} awardMessage={'Hello'} />
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