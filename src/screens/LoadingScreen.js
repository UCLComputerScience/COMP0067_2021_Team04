import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Button, StyleSheet, Animated, ImageBackground, Image } from 'react-native';
import { Component } from 'react';

import Logo from '../imgs/logo.png'

class Loading extends Component {
    state = {
        LogoAnime: new Animated.Value(0),
        LogoText: new Animated.Value(0),
        loadingSpinner: false,
    };

    componentDidMount() {
        const {LogoAnime, LogoText} = this.state;
        Animated.parallel([
            Animated.spring(LogoAnime, {
                toValue: 1,
                tension: 30,
                friction: 2,
                duration: 2200,
            }).start(),
            Animated.timing (LogoText, {
                toValue: 1,
                duration: 1200,
            }),
        ]).start(() => {
            this.setState({
                loadingSpinner: true,
            });
        });
    }
        render() {
        return (
            <ImageBackground style={styles.background} source={require('../imgs/question-mark-background-vector.jpg')} >
            <View style={styles.container}>
                <Animated.View
                 style={{
                    opacity: this.state.LogoAnime,
                    top: this.state.LogoAnime.interpolate({
                        inputRange: [0, 1],
                        outputRange: [80, 0],
                        }),
                }}>
                    <Image source={Logo} style={styles.logo}/>
                </Animated.View>
                {/* <Animated.View style={{opacity: this.state.LogoText}}> 
            <Text style={styles.logoText}>HEALTHY CHILDREN LOVE LEARNING</Text>
            </Animated.View> */}
            </View>
            </ImageBackground>
        );
        }
    };




export default Loading;

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center"
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    logoText: {
        color: 'white',
        backgroundColor: 'gray',
        fontFamily: 'Roboto',
        fontSize: 20,
        marginTop: 29.1,
        fontWeight: '300',
        borderColor: 'blue',
        borderWidth: 3,
        // alignItems: 'center'
    },
    logo: {
        height: 100,
        width: 300,
        marginVertical: 20,
        resizeMode: 'cover',
        backgroundColor: 'white',
        borderColor: 'blue',
        borderWidth: 3,
    },
});

