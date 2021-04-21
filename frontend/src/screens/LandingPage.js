import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image, StyleSheet, Animated, ScrollView, ImageBackground} from 'react-native';
import RandomNumber from '../factory/RandomNumber';
import { Dimensions, TouchableHighlight } from 'react-native';
import LandingHeader from '../components/LandingHeader';
import TTButton from '../components/TTButton';



class LandingPage extends React.Component {
    // static propTypes = {
    //     iconNumberCount: PropTypes.number.isRequired,
    // };
    
    state = {
        selectedIds: [],
    }
    isNumberSelected = (numberIndex) => {
        return this.state.selectedIds.indexOf(numberIndex) >= 0;
    };
    // beginner="#cd7f32"
    // intermediate="#c0c0c0"
    // advanced="ffd700"
    selectNumber = (numberIndex) => {
        this.setState((prevState) => ({ 
            selectedIds: [...prevState.selectedIds, numberIndex],
        }));
    };
}


const IconNav = ({navigation}) => {
  const difficultyColours = 
{
  "beginner":"#cd7f32",
  "intermediat":"#c0c0c0",
  "advanced":"#ffd700"
}
  const [user, userLoad] = useState({
    GSI1: "class_2ec278cf-1a35-4746-911b-1a360c83dbb5",
    PK: "user_mathsqueen",
    data:  {
      "avatar": 4,
      "firstName": "Andrew",
      "hashPassword": "$2a$10$E71aiun83wdz5/FY374JU.e1abBYyA0VwV/C.unxGKZ2CXaZSXB6i",
      "lastName": "O'Connell",
      "pendingAssignments": 16,
      "role": "student",
      "secret": "studentSecret",
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
    let pic = result.data.avatar
    let pp = avatarDict[pic]
    changePP({photo: pp})
    console.log(user.data)
    
    
    
    

    
  }
} catch (error) {
  
  console.log("error")
}
}

fetchData()

},[]);
  
  var dos = 2;
        return(
            <View style={styles.container}>

              {/* <LandingHeader /> */}
                <View style={styles.iconContainer}>
                            <TouchableHighlight 
      underlayColor = '#ccc'
      onPress = { () => alert('Help!') }
    >
      <Image style={styles.qmark}
          source={require('../imgs/qmark2.png')}
      />
    </TouchableHighlight>
    </View>
                
                <View style={styles.randomContainer}>
                  <TTButton number={'2'}
                  colour={difficultyColours[user.twox.state]}
                  isDisabled = {false}
                  onPress={() => navigation.navigate('Difficulty')}
                   />
       <TTButton number={'3'}
                  colour={difficultyColours[user.threex.state]}
                  isDisabled = {false}
                  onPress={() => navigation.navigate('Difficulty')}
                   />
       <TTButton number={'4'}
                  colour={difficultyColours[user.fourx.state]}
                  isDisabled = {false}
                  onPress={() => navigation.navigate('Difficulty')}
                   />
       <TTButton number={'5'}
                  colour={difficultyColours[user.fivex.state]}
                  isDisabled = {false}
                  onPress={() => navigation.navigate('Difficulty')}
                   />
       <TTButton number={'6'}
                  colour={difficultyColours[user.sixx.state]}
                  isDisabled = {false}
                  onPress={() => navigation.navigate('Difficulty')}
                   />
       <TTButton number={'7'}
                  colour={difficultyColours[user.sevenx.state]}
                  isDisabled = {false}
                  onPress={() => navigation.navigate('Difficulty')}
                   />
       <TTButton number={'8'}
                  colour={difficultyColours[user.eightx.state]}
                  isDisabled = {false}
                  onPress={() => navigation.navigate('Difficulty')}
                   />
       <TTButton number={'9'}
                  colour={difficultyColours[user.ninex.state]}
                  isDisabled = {false}
                  onPress={() => navigation.navigate('Difficulty')}
                   />
       <TTButton number={'10'}
                  colour={difficultyColours[user.tenx.state]}
                  isDisabled = {false}
                  onPress={() => navigation.navigate('Difficulty')}
                   />
       <TTButton number={'11'}
                  colour={difficultyColours[user.elevenx.state]}
                  isDisabled = {false}
                  onPress={() => navigation.navigate('Difficulty')}
                   />
       <TTButton number={'12'}
                  colour={difficultyColours[user.twelvex.state]}
                  isDisabled = {false}
                  onPress={() => navigation.navigate('Difficulty')}
                   />
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
        )
    }


const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center"
    },
    container: {
        color: 'white',
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