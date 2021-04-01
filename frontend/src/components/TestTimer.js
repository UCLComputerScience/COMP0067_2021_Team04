import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import { Animated } from "react-native";
import React from 'react';

const TestTimer = () => {
    return (
  <CountdownCircleTimer
    size={50}
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
    );
    };

export default TestTimer;