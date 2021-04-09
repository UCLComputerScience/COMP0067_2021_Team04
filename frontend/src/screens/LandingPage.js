import React from 'react';
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
    selectNumber = (numberIndex) => {
        this.setState((prevState) => ({ 
            selectedIds: [...prevState.selectedIds, numberIndex],
        }));
    };
}

const IconNav = ({navigation}) => {
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
                  colour={'#cd7f32'}
                  isDisabled = {false}
                  onPress={() => navigation.navigate('Difficulty')}
                   />
       <TTButton number={'3'}
                  colour={'#c0c0c0'}
                  isDisabled = {false}
                  onPress={() => navigation.navigate('Difficulty')}
                   />
       <TTButton number={'4'}
                  colour={'#c0c0c0'}
                  isDisabled = {false}
                  onPress={() => navigation.navigate('Difficulty')}
                   />
       <TTButton number={'5'}
                  colour={'#ffd700'}
                  isDisabled = {false}
                  onPress={() => navigation.navigate('Difficulty')}
                   />
       <TTButton number={'6'}
                  colour={'#c0c0c0'}
                  isDisabled = {false}
                  onPress={() => navigation.navigate('Difficulty')}
                   />
       <TTButton number={'7'}
                  colour={'#c0c0c0'}
                  isDisabled = {false}
                  onPress={() => navigation.navigate('Difficulty')}
                   />
       <TTButton number={'8'}
                  colour={'#ffd700'}
                  isDisabled = {false}
                  onPress={() => navigation.navigate('Difficulty')}
                   />
       <TTButton number={'9'}
                  colour={'#c0c0c0'}
                  isDisabled = {false}
                  onPress={() => navigation.navigate('Difficulty')}
                   />
       <TTButton number={'10'}
                  colour={'#ffd700'}
                  isDisabled = {false}
                  onPress={() => navigation.navigate('Difficulty')}
                   />
       <TTButton number={'11'}
                  colour={'#cd7f32'}
                  isDisabled = {false}
                  onPress={() => navigation.navigate('Difficulty')}
                   />
       <TTButton number={'12'}
                  colour={'#cd7f32'}
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