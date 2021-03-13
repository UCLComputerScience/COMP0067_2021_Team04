import React from 'react';
import { ImageBackground, StyleSheet, View, Image } from 'react-native';

function WelcomeScreen(props) {
    return (
        <ImageBackground 
        style={styles.background}
        source={require('../img/background.jpg')}
        >
            <View style={styles.logoContainer}>
                <Image style = {styles.logo} source={require('../img/logo.png')}/>

            </View>
            <View style={styles.loginButton}></View>
            <View style={styles.registerButton}></View>

        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center"
    },
    
    logo: {
        width: 300,
        height: 100,
    },
    
    logoContainer: {
        position: "absolute",
        top: 70,
        alignItems: "center",
    },

    loginButton: {
        width: '100%',
        height: 70,
        backgroundColor: '#fc5c65',
    },

    registerButton: {
        width: '100%',
        height: 70,
        backgroundColor: '#4ecdc4',
    }
})

export default WelcomeScreen;