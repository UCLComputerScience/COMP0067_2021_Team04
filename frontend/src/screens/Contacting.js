import React, { Component, useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  FlatList,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default Contacting = ({navigation}) => {
  const [user, userLoad] = useState();
  
  useEffect(()=>{
    async function fetchData (){

try {
  const value = await AsyncStorage.getItem('user');
  if (value !== null) {
    // We have data!!
    let result = JSON.parse(value)
    
    userLoad(result)
    
    
    
    let resChild = await axios.get('http://34.247.47.193/api/v1/users/individual/' + result.GSI1)
    let resClass = await axios.get('http://34.247.47.193/api/v1/classes/' + resChild.data.Item.GSI1)
    console.log(resClass)
  }
} catch (error) {
  console.log("error")
}
}

fetchData()

},[]);
  
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     calls: [
  //       {id:1,  name: "Mr. Beale",   image:"https://bootdey.com/img/Content/avatar/avatar7.png"},
  //       // {id:2,  name: "Mrs. James",   image:"https://bootdey.com/img/Content/avatar/avatar6.png"} ,
  //       // {id:3,  name: "Mr. Michales",   image:"https://bootdey.com/img/Content/avatar/avatar5.png"} ,
  //       // {id:4,  name: "Mr. Cook",  image:"https://bootdey.com/img/Content/avatar/avatar4.png"} ,
  //       // {id:5,  name: "Ms. Cooper",    image:"https://bootdey.com/img/Content/avatar/avatar3.png"} ,
  //     ]
  //   };
  // }

  // renderItem = ({item}) => {
  //   return (
  //     <TouchableOpacity onPress={() => Alert.alert('Email to contact me')}>
  //       <View style={styles.row}>
  //         <Image source={{ uri: item.image }} style={styles.pic} />
  //         <View>
  //           <View style={styles.nameContainer}>
  //             <Text style={styles.nameTxt} numberOfLines={1} ellipsizeMode="tail">{item.name}</Text>
  //             <Text style={styles.mblTxt}>Email
  //             </Text>
  //           </View>
  //           <View style={styles.msgContainer}>
  //           </View>
  //         </View>
  //       </View>
  //     </TouchableOpacity>
  //   );
  // }


    return(
      // <View style={{ flex: 1 }} >
      //   <FlatList 
      //     extraData={this.state}
      //     data={this.state.calls}
      //     keyExtractor = {(item) => {
      //       return item.id;
      //     }}
      //      renderItem={renderItem()}/>
      // </View>
      <Text>Testing</Text>
    );
  }


const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#DCDCDC',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    padding: 10,
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
    marginLeft: 15,
    fontWeight: '600',
    color: '#222',
    fontSize: 18,
    width:170,
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
});