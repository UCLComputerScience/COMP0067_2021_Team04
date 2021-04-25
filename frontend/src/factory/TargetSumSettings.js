import React from 'react';

import PropTypes from 'prop-types';
import TargetSum from './TargetSum';
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native';

class TargetSumSettings extends React.Component {
    state = {
        gameId: 1,
    };
    resetGame = () => {
        this.setState((prevState) => {
            return { gameId: prevState.gameId + 1};
        });
    };
    render() {
        return (
            <View style={styles.container}>
                <TargetSum
                key={this.state.gameId}
                onPlayAgain={this.resetGame} 
                randomNumberCount={global.targetSum}
                initialSeconds={10} 
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    random: {
    backgroundColor: '#999',
    width: 150,
    marginHorizontal: 15,
    marginVertical: 25,
    fontSize: 35,
    textAlign: 'center',
},
disabled: {
    opacity: 0.3,
},
container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default TargetSumSettings;