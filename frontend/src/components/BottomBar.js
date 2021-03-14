import * as React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
import PlayScreen from '../../screens/PlayScreen';
import StatsScreen from '../../screens/StatsScreen';
import SetHomework from '../../screens/SetAssignments';
import Contacting from '../../screens/Contacting';
import LandingPage from '../../src/components/LandingPage';
// import WelcomeScreen from '../../screens/WelcomeScreen';
import LoginScreen from '../../screens/LoginScreen';
import { StyleSheet, Image, View } from 'react-native';
import TargetSumGame from '../components/TargetSumGame';

const PlayRoute = () => <LandingPage />;

const StatsRoute = () => <StatsScreen />;

const TasksRoute = () => <SetHomework/>;

const ContactsRoute = () => <Contacting />;

const MyGameRoute = () => <TargetSumGame />;


const BotBar = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'play', title: 'Play' ,  color: '#CD5C5C',icon: 'warehouse'},
    { key: 'stats', title: 'Stats',  color: '#4169E1',icon: 'warehouse'},
    { key: 'tasks', title: 'Tasks',  color: '#008080',icon: 'warehouse'},
    { key: 'contacts', title: 'Contacts',  color: '#FA8072',icon: 'warehouse'},
    { key: 'game', title: 'Game',  color: '#800000',icon: 'warehouse'},

  ]);

  const renderScene = BottomNavigation.SceneMap({
    play: PlayRoute,
    stats: StatsRoute,
    tasks: TasksRoute,
    contacts: ContactsRoute,
    game: MyGameRoute,
  });

  return (
    <BottomNavigation 
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
      style={styles.bottom}
    />
  );
};

const styles = StyleSheet.create({
    bottom: {
      backgroundColor: 'yellow'
      
    },
    tinyLogo: {
        width: 55,
        height: 55,
        backgroundColor: 'red'
      },
    line: {
    borderWidth:6,
    borderColor: 'black',
    height: 67,
    width: 20
    }
  });


export default BotBar;