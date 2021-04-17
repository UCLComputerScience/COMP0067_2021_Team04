import  { useState }  from 'react';
import { Alert, StyleSheet, Text, View, TouchableHighlight} from 'react-native';
import Leader from '../components/Leaderboard';
import Leaderboard from 'react-native-leaderboard';
import React, { Component } from "react";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import ModalDropdown from 'react-native-modal-dropdown';


export default class LeaderBoardScreen extends Component {
  state = {
    data: DATA
  };

  componentDidMount() {
    // simulate new users being added to leaderboard
    setInterval(() => {
      const newData = {
        name: "New User Data!!",
        score: Math.floor(Math.random() * 100).toString(),
        iconUrl:
          "https://www.shareicon.net/data/128x128/2016/09/15/829473_man_512x512.png"
      };
      this.setState({ data: this.state.data.concat(newData) });
    }, 500000);
  }

  alert = (title, body) => {
    Alert.alert(title, body, [{ text: "OK", onPress: () => {} }], {
      cancelable: false
    });
  };

  render() {
    const props = {
      labelBy: "name",
      sortBy: "score",
      data: this.state.data,
      icon: "iconUrl",
      onRowPress: (item, index) => {
        this.alert(item.name + " clicked", item.score + " points, wow!");
      },
      evenRowColor: "#edfcf9"
    };
    
    return (
      <View style={styles.container}>
          <View style={styles.scaleWrap}>
              <TouchableHighlight onPress={() => alert('Compare by class')}>
              <Text style={styles.scaleText}>Class</Text>
              </TouchableHighlight>
              <View style={styles.line} />
              <TouchableHighlight onPress={() => alert('Compare by school')}>
              <Text style={styles.scaleText}>School</Text>
              </TouchableHighlight>
              <View style={styles.line} />
              <TouchableHighlight onPress={() => alert('Compare nationally')}>
              <Text style={styles.scaleText}>National</Text>
              </TouchableHighlight>
          </View>
        <View
          style={styles.headerWrap}
        >
          <Text style={{ fontSize: 30, color: "white", paddingBottom: 10 ,fontFamily: "HelveticaNeue" }}>
            Star Students!  <Ionicons name="star" size={30} color="gold"></Ionicons>
            <Ionicons name="star" size={30} color="silver">
                </Ionicons><Ionicons name="star" size={30} color="#cd7f32"></Ionicons>
          </Text>
          <View style={styles.formLayout}>
                <ModalDropdown dropdownTextStyle={{fontWeight:'bold', textAlign: 'center', fontSize: 15}}
                    textStyle={{fontWeight:'bold', textAlign: 'right',  fontSize: 20}} 
                    animated={true} 
                    showsVerticalScrollIndicator={true} 
                    isFullWidth = {true} 
                    style = {{marginHorizontal: 100, borderColor: 'black', borderWidth: 2}}
                    defaultValue = {'Select class...'} 
                    options={['5A', '4C', '6D']}/>
             </View>
        </View>
        <Leaderboard {...props} />
      </View>
    );
  }
}

const DATA = [
  {
    name: "Stacey Slater",
    score: null,
    iconUrl:
      "https://st2.depositphotos.com/1006318/5909/v/950/depositphotos_59094043-stock-illustration-profile-icon-male-avatar.jpg"
  },
  {
    name: "Max Branning",
    score: 12,
    iconUrl:
      "https://www.shareicon.net/data/128x128/2016/09/15/829473_man_512x512.png"
  },
  {
    name: "Phil Mitchell",
    score: 244,
    iconUrl: "http://ttsbilisim.com/wp-content/uploads/2014/09/20120807.png"
  },
  {
    name: "Sharon White",
    score: 0,
    iconUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr27ZFBaclzKcxg2FgJh6xi3Z5-9vP_U1DPcB149bYXxlPKqv-"
  },
  {
    name: "Shirley Carter",
    score: 20,
    iconUrl: "https://static.witei.com/static/img/profile_pics/avatar4.png"
  },
  {
    name: "Joe Roddy",
    score: 69,
    iconUrl: "https://static.witei.com/static/img/profile_pics/avatar4.png"
  },
  {
    name: "Ericka Johannesburg",
    score: 101,
    iconUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShPis8NLdplTV1AJx40z-KS8zdgaSPaCfNINLtQ-ENdPvrtMWz"
  },
  {
    name: "Tim Thomas",
    score: 41,
    iconUrl: "http://ttsbilisim.com/wp-content/uploads/2014/09/20120807.png"
  },
  {
    name: "John Davis",
    score: 80,
    iconUrl:
      "https://cdn.dribbble.com/users/223408/screenshots/2134810/me-dribbble-size-001-001_1x.png"
  },
  {
    name: "Tina Turner",
    score: 22,
    iconUrl:
      "https://cdn.dribbble.com/users/223408/screenshots/2134810/me-dribbble-size-001-001_1x.png"
  },
  {
    name: "Harry Reynolds",
    score: null,
    iconUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsSlzi6GEickw2Ft62IdJTfXWsDFrOIbwXhzddXXt4FvsbNGhp"
  },
  {
    name: "Betty Davis",
    score: 25,
    iconUrl:
      "https://landofblogging.files.wordpress.com/2014/01/bitstripavatarprofilepic.jpeg?w=300&h=300"
  },
  {
    name: "Lauren Leonard",
    score: 30,
    iconUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr27ZFBaclzKcxg2FgJh6xi3Z5-9vP_U1DPcB149bYXxlPKqv-"
  }
];


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF"
    },
    headerWrap: {
        paddingTop: 10,
        backgroundColor: "black",
        alignItems: "center"
    },
    scaleWrap: {
        height: 50,
        backgroundColor: "white",
        alignItems: "center",
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly'
    },
    line: {
        height: 50,
        borderColor: 'black',
        borderWidth: 1
    },
    scaleText: {
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: "HelveticaNeue",

    },
    square: {
        height: 30,
        width: 30,
        alignSelf: 'flex-end',
        marginVertical: -25
        },
    formLayout: {
        backgroundColor: 'white',
        height: 150,
        width: 400,
        justifyContent: 'center',
        alignContent: 'center',
    },
})