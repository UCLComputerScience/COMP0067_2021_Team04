// Aboutscreen.js
import React from 'react';
import PropTypes from 'prop-types';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native';

class MultiIcons extends React.Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    number: PropTypes.number.isRequired,
    onPress: PropTypes.func.isRequired,
  };
  handlePress = () => {
    this.props.onPress(this.props.id); 
  };
    render() {
      return (
        <TouchableOpacity onPress={this.handlePress}>
        <Text style={[styles.random, this.props.isDisabled && styles.disabled]}>
            {this.props.number}
        </Text>
        </TouchableOpacity>
    );
}
}

const styles = StyleSheet.create({
    // randomContainer: {
    //   flex: 1,
    //   flexDirection: 'row',
    //   flexWrap: 'wrap',
    //   justifyContent: 'center',
    // },
    disabled: {
      opacity: 0.3,
    },
    text: {
      borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
      width: Dimensions.get('window').width * 0.23,
      height: Dimensions.get('window').width * 0.23,
      backgroundColor:'white',
      borderColor: 'black',
      borderWidth: 4,
      alignItems: 'center',
      textAlignVertical: 'center',
      textAlign: 'center',
      width: 90,
      marginHorizontal: 40,
      marginVertical: 10,
      fontSize: 30,
  }});

export default MultiIcons;