import React, { useState }  from 'react';
import { Alert, Button, Platform, SafeAreaView, StatusBar, StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import CheckBox from 'react-native-check-box';
import Cal from '../components/Calendar';

class SetHomework extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.formLayout}>
                <ModalDropdown dropdownTextStyle={{fontWeight:'bold', textAlign: 'center', fontSize: 15}}
                    textStyle={{fontWeight:'bold', textAlign: 'right',  fontSize: 20}} 
                    animated={true} 
                    showsVerticalScrollIndicator={true} 
                    isFullWidth = {true} 
                    style = {{width: 340}}
                    defaultValue = {'Select timestables...'} 
                    options={['2x','3x','4x','5x','6x','7x','8x','9x','10x','11x','12x']}/>
                <Image style={styles.square}
          source={require('../imgs/noun_Dropdown_1270432.png')} />
             </View>
             <View style={styles.formLayout2}>
                <ModalDropdown dropdownTextStyle={{fontWeight:'bold', textAlign: 'center', fontSize: 15}}
                    textStyle={{fontWeight:'bold', textAlign: 'right',  fontSize: 20}} 
                    animated={true} 
                    showsVerticalScrollIndicator={true} 
                    isFullWidth = {true} 
                    style = {{width: 340}}
                    defaultValue = {'Select difficulty...'} 
                    options={['Beginner','Intermediate','Advanced']}/>
                <Image style={styles.square}
          source={require('../imgs/noun_Dropdown_1270432.png')} />
             </View>
             <View style={styles.formLayout3}>
                 <View style={styles.container2}>
                     <Text>Select Class</Text>
                     <Text>5A</Text>
                    <CheckBox onClick={() => alert('Set hw')}/>
                    <Text>4B</Text>
                    <CheckBox onClick={() => alert('Set hw')}/>
                    <Text>5B</Text>
                    <CheckBox onClick={() => alert('Set hw')}/>

                    </View>
                    <View style={styles.container3}></View> 
                            <Cal />
             </View>
             
            <View style={styles.buttonContainer}>
            <Button   title="Publish Assignment"
          onPress = { () => alert('Publish Assignment') } />
          </View>
          </View>
        )
    }
}

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        backgroundColor: '#E8EAED',
    },
    container2: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
    container3: {
        flex: 6,
        justifyContent: 'center',
        marginBottom: -2000

    },
    formLayout: {
        backgroundColor: '#E8EAED',
        marginTop: 30,
        marginBottom: 510,
        borderColor: 'black',
        borderWidth: 1,
        width: 340,
        height: 35,
        alignSelf: 'center',
    },
    formLayout2: {
        backgroundColor: '#E8EAED',
        borderColor: 'black',
        borderWidth: 1,
        width: 340,
        height: 35,
        alignSelf: 'center',
        marginTop: -480
    },
    formLayout3: {
        borderColor: 'black',
        borderWidth: 1,
        width: 340,
        height: 300,
        alignSelf: 'center',
        margin: 30
    },
    buttonContainer: {
        flex: 1,
        marginBottom: 80,
        justifyContent: 'flex-end',
    },
    square: {
        height: 30,
        width: 30,
        alignSelf: 'flex-end',
        marginVertical: -25
        },
    line: {
        borderWidth:1,
        borderColor: 'black',
        height: 17,
        },
        title: {
            fontSize: 24,
            fontWeight: 'bold',
            marginVertical: 10
        },
});

export default SetHomework;