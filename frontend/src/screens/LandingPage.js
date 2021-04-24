import React, {useState} from 'react';
import PropTypes, { number } from 'prop-types';
import { View, Text, Image, StyleSheet, Animated, ScrollView, ImageBackground} from 'react-native';
import RandomNumber from '../factory/RandomNumber';
import { Dimensions, TouchableHighlight } from 'react-native';
import LandingHeader from '../components/LandingHeader';
import TTButton from '../components/TTButton';
import AsyncStorage from  '@react-native-community/async-storage';
import { Ionicons, MaterialIcons } from "@expo/vector-icons";



const beginner="#cd7f32"
const intermediate="#c0c0c0"
const advanced="#ffd700"

const two = 2 
const three = 3
const four = 4
const five = 5
const six = 6
const seven = 7
const eight = 8
const nine = 9
const ten = 10
const eleven = 11
const twelve = 12



export function ChangeChoice(number) {
  var selection = number
  console.warn(selection)
      return selection;
}

// export const [testing, setTesting] = useState();
// export const gell = ChangeChoice()
// console.warn(gell)

// export const test_variable = this.changeChoice

class LandingPage extends React.Component {
    
  // state = {
  //   ttSelected: "",
  //   username: ""
  // }

  // constructor(props) {
  //   super(props);
  //   this.getData();
  // }

  // onSumbmit = async () => {
  //   try{
  //     this.setState({token: 'abc123'})
  //     await Asynctorage.setItem('username', this.state.username)
  //     await Asynctorage.setItem('ttSelected', 'abc123')
  //   }
  //   catch (err) {
  //     console.log(err)
  //   }
  // }
    
  
  // render() {
}


   const IconNav = ({navigation}) => {
   const [testing, setTesting] = useState();
   global.TT = testing;
        return(
            <View style={styles.container}>
          <LandingHeader />
                <View style={styles.iconContainer}>
                            <TouchableHighlight 
      underlayColor = '#ccc'
      onPress = { () => alert('Help!') }
    >
           <Ionicons name="help-circle" size={40} color="#52575D"></Ionicons>

    </TouchableHighlight>
    </View>
                
                <View style={styles.randomContainer}>
                  <TTButton 
                  number={two}
                  colour={beginner}
                  isDisabled = {false}
                  onPress={() => {setTesting(2)
                                  navigation.navigate('Difficulty', {paramKey: testing})}}
                   />
       <TTButton number={three}
                  colour={intermediate}
                  isDisabled = {false}
                  onPress={() => {setTesting(3)
                                  navigation.navigate('Difficulty', {paramKey: testing})}}
                   />
       <TTButton number={four}
                  colour={intermediate}
                  isDisabled = {false}
                  onPress={() => {setTesting(4)
                                  navigation.navigate('Difficulty', {paramKey: testing})}}
                   />
       <TTButton number={five}
                  colour={advanced}
                  isDisabled = {false}
                  onPress={() => {setTesting(5)
                                  navigation.navigate('Difficulty', {paramKey: testing})}}                   />
       <TTButton number={six}
                  colour={intermediate}
                  isDisabled = {false}
                  onPress={() => {setTesting(6)
                                  navigation.navigate('Difficulty', {paramKey: testing})}}                   />
       <TTButton number={seven}
                  colour={intermediate}
                  isDisabled = {false}
                  onPress={() => {setTesting(7)
                                  navigation.navigate('Difficulty', {paramKey: testing})}}                   />
       <TTButton number={eight}
                  colour={advanced}
                  isDisabled = {false}
                  onPress={() => {setTesting(8)
                                  navigation.navigate('Difficulty', {paramKey: testing})}}                   />
       <TTButton number={nine}
                  colour={intermediate}
                  isDisabled = {false}
                  onPress={() => {setTesting(9)
                                  navigation.navigate('Difficulty', {paramKey: testing})}}                   />
       <TTButton number={ten}
                  colour={advanced}
                  isDisabled = {false}
                  onPress={() => {setTesting(10)
                                  navigation.navigate('Difficulty', {paramKey: testing})}}                   />
       <TTButton number={eleven}
                  colour={beginner}
                  isDisabled = {false}
                  onPress={() => {setTesting(11)
                                  navigation.navigate('Difficulty', {paramKey: testing})}}                   />
       <TTButton number={twelve}
                  colour={beginner}
                  isDisabled = {false}
                  onPress={() => {setTesting(12)
                                  navigation.navigate('Difficulty', {paramKey: testing})}}                   />
    </View>
    <View style = {styles.extrabuttons}>
    <TouchableHighlight 
      onPress={() => navigation.navigate('Countdown3')}
    >
      <Image style={styles.tinyLogo}
          source={require('../imgs/vector-shuffle-glyph-black-icon.jpg')}
          
      />
    </TouchableHighlight>
    <TouchableHighlight 
      underlayColor = '#ccc'
      onPress={() => navigation.navigate('Challenge')}
    >
      <Image style={styles.tinyLogo}
          source={require('../imgs/multiplayer-icon-mode-isolated-contour-vector-28398206.jpg')}
      />
    </TouchableHighlight>
     </View>
     {/* <AppBar></AppBar> */}
     
          </View> 
        )  ;
}
  

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center"
    },
    container: {
        backgroundColor: 'white',
        flex: 1,
    },
    iconContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    extrabuttons: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignContent: 'flex-end',
        marginHorizontal: 10,
        marginVertical: 10,
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    tinyLogo: {
        width: 25,
        height: 25,
        borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
        width: Dimensions.get('window').width * 0.15,
        height: Dimensions.get('window').width * 0.15,
        backgroundColor:'lightblue',
        borderColor: 'black',
        borderWidth: 4,
        alignItems: 'center',
        marginHorizontal: 20,
        marginVertical: 10,
      },
    randomContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    qmark: {
        flexDirection: 'row-reverse',
        width: 15,
        height: 15,
        borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
        width: Dimensions.get('window').width * 0.10,
        height: Dimensions.get('window').width * 0.10,
        borderColor: 'black',
        borderWidth: 4,
        alignItems: 'flex-end',
        marginHorizontal: 10,
        marginVertical: 10,
      },
      text: {
        backgroundColor:'white',
        borderColor: 'black',
        borderWidth: 4,
        alignItems: 'center',
        textAlignVertical: 'center',
        textAlign: 'center',
        width: 70,
        height: 70,
        borderRadius:70/2,
        marginHorizontal: 40,
        marginVertical: 5,
        fontSize: 30,
      },
  });
      
export default IconNav;
