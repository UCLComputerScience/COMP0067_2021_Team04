import * as React from 'react';
import { Appbar } from 'react-native-paper';
import { StyleSheet, Image, View } from 'react-native';

const AppBar = () => (
 <Appbar style={styles.bottom}>
    <Appbar.Action size={37} icon={require('../../img/noun_Brain_3088298.png')} onPress={() => alert('Play')} />
    <View style={styles.line} />
    <Appbar.Action size={37} icon={require('../../img/noun_profile_2455922.png')} onPress={() => alert('My Profile')} />
    <View style={styles.line} />
    <Appbar.Action size={37} icon={require('../../img/noun_stats_3580023.png')} onPress={() => alert('Stats')} />
    <View style={styles.line} />
    <Appbar.Action size={37} icon={require('../../img/noun_tasks_699088.png')} onPress={() => alert('Tasks')} />
  </Appbar>
 );

const styles = StyleSheet.create({
  bottom: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    backgroundColor: '#CD5C5C'
  },
  line: {
  borderWidth:1,
  borderColor: 'white',
  height: 67,
  }
});

export default AppBar;