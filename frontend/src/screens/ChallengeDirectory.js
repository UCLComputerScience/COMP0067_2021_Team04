import React, { Component } from 'react';
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

export default class ChallengeDirectory extends Component {

  constructor(props) {
    super(props);
    this.state = {
      completedChallenges: [
        {id:1,  name: "You vs Mr Beale",   image:"https://bootdey.com/img/Content/avatar/avatar7.png"},
        {id:1,  name: "You vs Mr Beale",   image:"https://bootdey.com/img/Content/avatar/avatar7.png"},
        {id:1,  name: "You vs Mr Beale",   image:"https://bootdey.com/img/Content/avatar/avatar7.png"},
        {id:1,  name: "You vs Mr Beale",   image:"https://bootdey.com/img/Content/avatar/avatar7.png"},
      ],

      pendingChallenges: [
        {id:1,  name: "You vs Robert",   image:"https://bootdey.com/img/Content/avatar/avatar8.png"},
        {id:1,  name: "You vs Robert",   image:"https://bootdey.com/img/Content/avatar/avatar8.png"},
        {id:1,  name: "You vs Robert",   image:"https://bootdey.com/img/Content/avatar/avatar8.png"},
        {id:1,  name: "You vs Robert",   image:"https://bootdey.com/img/Content/avatar/avatar8.png"},
      ]
    };
  }

  

  renderItem = ({item}) => {
    return (
        <View>
      <TouchableOpacity onPress={() => Alert.alert('Challenge details')}>
        <View style={styles.row}>
          <Image source={{ uri: item.image }} style={styles.pic} />
          
          <View>
            <View style={styles.nameContainer}>
              <Text style={styles.nameTxt} numberOfLines={1} ellipsizeMode="tail">{item.name}</Text>
              
              <Text style={{marginTop:15, marginHorizontal: -90, flex: 1, flexDirection: 'row', flexWrap: 'wrap'}}>testteacher@gmail.com</Text>
            </View>
            <View style={styles.msgContainer}>
            </View>
          </View>
        </View>
      </TouchableOpacity>
              </View>
              
    );
  }

  renderItem = ({item}) => {
    return (
        <View>
      <TouchableOpacity onPress={() => Alert.alert('Challenge details')}>
        <View style={styles.row}>
          <Image source={{ uri: item.image }} style={styles.pic} />

          <View>
            <View style={styles.nameContainer}>
              <Text style={styles.nameTxt} numberOfLines={1} ellipsizeMode="tail">{item.name}</Text>
              <Image source={{ uri: item.image }} style={styles.pic} />

            </View>
            <View style={styles.msgContainer}>
            </View>
          </View>
        </View>
      </TouchableOpacity>
              </View>
              
    );
  }

  render() {
    return(
      <View style={{ flex: 1 }} >
          <Button title="BEGIN NEW CHALLENGE"  onPress={() => this.props.navigation.navigate('Challenge')} />
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