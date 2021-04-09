import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import { Animated, View, StyleSheet} from "react-native";
import React from 'react';
import PropTypes from 'prop-types';


const TestTimer = () => {
    return (
      <View style={styles.centeredView}>
  <CountdownCircleTimer
    size={80}
    isPlaying
    duration={60}
    colors={[
      ['#004777', 0.4],
      ['#F7B801', 0.4],
      ['#A30000', 0.2],
    ]}
  >
    {({ remainingTime, animatedColor }) => (
      <Animated.Text style={{ color: animatedColor }}>
        {remainingTime}
      </Animated.Text>
    )}
  </CountdownCircleTimer>
  </View>
    );
    };

    const styles = StyleSheet.create({
      centeredView: {
        justifyContent: "center",
        alignItems: "center",
        // marginEnd: -50
      }
    })

export default TestTimer;