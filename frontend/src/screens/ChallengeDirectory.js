import React, {useState, Component, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  FlatList, Button
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import avatarDict from "../components/AvatarDict";

const [tracker, setTracker] = useState();
global.scoreTracker = tracker;

export default class ChallengeDirectory extends Component {
 

  constructor(props) {
    super(props);
    this.state = {
      completedChallenges: [
        
      ],

      pendingChallenges: [
        
      ]
    };
  }
  getChallenges = async()=>{
    try {
      const value = await AsyncStorage.getItem('user');
      if (value !== null) {
        // We have data!!
        let result = JSON.parse(value)
        let pendingAddress = 'http://34.247.47.193/api/v1/challenges/pending/' + result.PK
        let res = await axios.get(pendingAddress)
    console.log(res)
    this.setState((prevState) => {
      return { ...prevState,
        pendingChallenges: res
              };
            })
        let res2 = await axios.get('http://34.247.47.193/api/v1/challenges/completed/' + result.PK)
    console.log(res2)
    this.setState((prevState) => {
      return { ...prevState,
        completedChallenges: res2
              };
            })
  }
        
    } catch (error) {
      console.log("error")
    }
  }
    
  componentDidMount() {
    this.getChallenges()
  }
  

  renderItem = ({item}) => {
    if(this.data!=[]){
    return (
        <View>
      <TouchableOpacity onPress={() => Alert.alert('Challenge details')}>
        <View style={styles.row}>
          <Image source={avatarDict[item.data.avatar]} style={styles.pic} />
          
          <View>
            <View style={styles.nameContainer}>
              <Text style={styles.nameTxt} numberOfLines={1} ellipsizeMode="tail">{item.data.firstName + " " + item.data.lastName}</Text>
              
              <Text style={{marginTop:15, marginHorizontal: -90, flex: 1, flexDirection: 'row', flexWrap: 'wrap'}}>testteacher@gmail.com</Text>
            </View>
            <View style={styles.msgContainer}>
            </View>
          </View>
        </View>
      </TouchableOpacity>
              </View>
              
    );
  }}

  renderItem = ({item}) => {
    if(this.data!=[]){
    return (
        <View>
      <TouchableOpacity onPress={() => Alert.alert('Challenge details', 'You have been invited to a challenge, click no to decline or yes to accept and play',
       [
                        {
                        text: "Cancel",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                        },
                        { text: "Accept", onPress: () => navigation.navigate('Load Video') },
                        { text: "Reject", onPress: () => navigation.navigate('Load Test') }
                    ]
                    )}>
        <View style={styles.row}>
          <Image source={avatarDict[item.data.avatar]} style={styles.pic} />

          <View>
            <View style={styles.nameContainer}>
              <Text style={styles.nameTxt} numberOfLines={1} ellipsizeMode="tail">{item.data.firstName + " " + item.data.lastName}</Text>
              <Image source={avatarDict[item.data.avatar]} style={styles.pic} />

            </View>
            <View style={styles.msgContainer}>
            </View>
          </View>
        </View>
      </TouchableOpacity>
              </View>
              
    );
  }
  }
  render() {
    return(
      <View style={{ flex: 1 }} >
          <Button title="BEGIN NEW CHALLENGE"  onPress={() => {this.props.navigation.navigate('Challenge')
                                                                setTracker(0)}} />
                 <Text style={styles.challengeText}>Completed Challenges</Text>
        <FlatList 
          extraData={this.state}
          data={this.state.completedChallenges}
          keyExtractor = {(item) => {
            return item.id;
          }}
          renderItem={this.renderItem}/>
          <Text style={styles.challengeText}>Challenge Requests</Text>
              <FlatList 
          extraData={this.state}
          data={this.state.pendingChallenges}
          keyExtractor = {(item) => {
            return item.id;
          }}
          renderItem={this.renderItem}/>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#DCDCDC',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    padding: 10,
    justifyContent: 'center'
  },
  pic: {
    borderRadius: 30,
    width: 60,
    height: 60,
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 280,
  },
  nameTxt: {
    marginLeft: 45,
    fontWeight: '600',
    color: '#222',
    fontSize: 18,
    width:170,
    marginVertical:30
  },
  mblTxt: {
    fontWeight: '200',
    color: '#777',
    fontSize: 13,
  },
  msgContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  msgTxt: {
    fontWeight: '400',
    color: '#008B8B',
    fontSize: 12,
    marginLeft: 15,
  },
  challengeText: {
    fontWeight: '400',
    color: 'black',
    fontSize: 20,
    marginBottom: 20,
    marginTop: 20,
    marginLeft: 10
  },
});