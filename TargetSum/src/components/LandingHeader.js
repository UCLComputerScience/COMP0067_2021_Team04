import * as React from 'react';
import { Appbar } from 'react-native-paper';
import { StyleSheet, Image, View, Text } from 'react-native';

const LandingHeader = () => (
    
 <Appbar style={styles.top}>
    <Appbar.Action size={37} icon={require('../../img/noun_Medal_1225632.png')} onPress={() => alert('Start')} />
    <Text style={styles.text}>LVL 26</Text>
    <Appbar.Action size={37} icon={require('../../img/noun_Fire_131591.png')} onPress={() => alert('Status')} />
    <Text style={styles.text}>5 DAY STREAK</Text>
  </Appbar>
 );

const styles = StyleSheet.create({
  top: {
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#FFD700',
  },
text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 2
},
});

export default LandingHeader;