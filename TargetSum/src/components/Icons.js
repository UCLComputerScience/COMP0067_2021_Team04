// Aboutscreen.js
import React, { Component } from 'react';
import { View } from 'react-native';
import MultiIcons from './MultiIcons';
import Header from '../../shared/header';
import { StyleSheet } from 'react-native';


export default class Icons extends Component {
    render() {
        return (
            <View style={styles.container}>
                <MultiIcons
                iconCount={11} 
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        color: 'white',
        flex: 1,
    },
    headerContainer: {
      marginTop: 50,
      marginHorizontal: 10
    },
    headerText: {
      fontSize: 30,
      fontWeight: 'bold',
      color: '#333',
      textAlign: 'center',
      marginTop: 35
    }
  });