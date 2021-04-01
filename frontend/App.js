import * as React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LoginScreen from './src/screens/LoginScreen';
import IconNav from './src/screens/LandingPage';
import MultiChoiceGame from './src/factory/MultiChoiceGame';
import StatsScreen from './src/screens/StatsScreen';
import SetHomework from './src/screens/SetAssignment';
import Loading from './src/screens/LoadingScreen';
import Tasks from './src/screens/MyTasks';
import Loader from './src/screens/GameLoadingScreen';
import MyProfile from './src/screens/MyProfile';
import LeaderBoardScreen from './src/screens/LeaderboardScreen';
import Challenger from './src/screens/ChallengeScreen';
import DifficultyPage from './src/screens/DifficultyPage';
import Countdown3 from './src/screens/Countdown3';
import Countdown2 from './src/screens/Countdown2';
import Countdown1 from './src/screens/Countdown1';
import Go from './src/screens/GoScreen';
import LeaderLoader from './src/screens/LeaderLoadingScreen';
import Quit from './src/components/QuitGame';
import { HeaderBackButton } from '@react-navigation/stack';
import LandingHeader from './src/components/LandingHeader';
import Contact from './src/screens/ContactScreen';
import TypeGame from './src/factory/TypeGame';
import TestSettings from './src/factory/TestSettings';
import TestLoader from './src/screens/TestLoadingScreen';
import PlayVideo from './src/screens/VideoScreen';


const LoginStack = createStackNavigator();

function LoginStackScreen() {
  return (
    <LoginStack.Navigator headerMode={false}>
      <LoginStack.Screen name="Loading" component={Loading} />
      <LoginStack.Screen name="Login" component={LoginScreen} />
    </LoginStack.Navigator>
  );
}

const StatsStack = createStackNavigator();

function StatsStackScreen() {
  return (
    <StatsStack.Navigator>
      <StatsStack.Screen name="Progress" component={StatsScreen} options={() => ({
           headerLeft: () => {
      return null}, title: 'My Progress',
          headerStyle: {
            backgroundColor: '#8FBC8F',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },})}/>
      <StatsStack.Screen name="Load" component={LeaderLoader} options={{headerShown: false}} />
      <StatsStack.Screen name="Leaderboard" component={LeaderBoardScreen} options={({navigation}) => ({
          headerLeft: (props) => (
            <HeaderBackButton
              {...props}
              label='Progress'
              onPress={() => navigation.navigate('Progress')}
            />
          ),
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
           
          },
          headerStyle: {
            backgroundColor: 'black',
          },
          
     })}
  /> 
    </StatsStack.Navigator>
  );
}

const HomeworkStack = createStackNavigator();

function HomeworkStackScreen() {
  return (
    <HomeworkStack.Navigator>
      <HomeworkStack.Screen name="My Tasks" component={Tasks} options={() => ({
           headerLeft: () => {
      return null }, title: 'My Tasks',
          headerStyle: {
            backgroundColor: '#483D8B',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },})}/>
      <HomeworkStack.Screen name="Landing" component={MultiChoiceGame} />
    </HomeworkStack.Navigator>
  );
}

const PlayStack = createStackNavigator();


function PlayStackScreen() {
  return (
    <PlayStack.Navigator>
      <PlayStack.Screen name="Landing" component={IconNav}       options={{headerLeft: () => {
      return null}, headerTitle: props => <LandingHeader {...props} /> }}
      />
      <PlayStack.Screen name="Countdown3" component={Countdown3} options={{headerShown: false,}}/>
      <PlayStack.Screen name="Countdown2" component={Countdown2} options={{headerShown: false}}/>
      <PlayStack.Screen name="Countdown1" component={Countdown1} options={{headerShown: false}}/>
      <PlayStack.Screen name="Go" component={Go} options={{headerShown: false}}/>
      <PlayStack.Screen name="Difficulty" component={DifficultyPage} />
      <PlayStack.Screen name="Video" component={PlayVideo} />
      <PlayStack.Screen name="Load Test" component={TestLoader} options={{headerShown: false}} />
      <PlayStack.Screen name="Test" component={TestSettings} options={({navigation}) => ({
        
        headerLeft: (props) => (
          <HeaderBackButton
            {...props}
            label='Quit?'
            onPress={() => Alert.alert(
    "Exit Game",
    "Are you sure that you would like to exit the game?",
    [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel"
      },
      { text: "OK", onPress: () => navigation.navigate('Landing') }
    ]
  )} 
  />),})}/>
      <PlayStack.Screen name="Load" component={Loader} options={{headerShown: false}} />
      <PlayStack.Screen name="Quit" component={Quit} options={{headerShown: false}} />
      <PlayStack.Screen name="Challenge" component={Challenger} />

      <PlayStack.Screen name="Game" component={MultiChoiceGame}  options={({navigation}) => ({
          headerLeft: (props) => (
            <HeaderBackButton
              {...props}
              label='Quit?'
              onPress={() => Alert.alert(
      "Exit Game",
      "Are you sure that you would like to exit the game?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => navigation.navigate('Landing') }
      ]
    )} />
            
          ),
     })}
  /> 
    </PlayStack.Navigator>
  );
}

const ProfileStack = createStackNavigator();

function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator>
     <ProfileStack.Screen name="My Profile" component={MyProfile} options={() => ({
      // <ProfileStack.Screen name="My Profile" component={Contact} options={() => ({
           headerLeft: () => {
      return null}, title: 'My Profile',
          headerStyle: {
            backgroundColor: '#B22222',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },})}/>
    </ProfileStack.Navigator>
  );
}

function StackNavi() {
  return (
      <Tab.Navigator>
                   <Tab.Screen name="Play" component={PlayStackScreen} 
         options={{
          tabBarLabel: 'Play',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="play" color={'red'} size={size} />
            
            
          ),
        }}
         />
        <Tab.Screen name="Stats" component={StatsStackScreen} 
         options={{
          tabBarLabel: 'Stats',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="clipboard-list" color={'#8FBC8F'} size={size} />
          ),
        }}
         />
         <Tab.Screen name="My Tasks" component={HomeworkStackScreen} 
         options={{
          tabBarLabel: 'My Tasks',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="school" color={'#483D8B'} size={size} />
          ),
        }}
         />
        <Tab.Screen name="Profile" component={ProfileStackScreen} 
         options={{
          tabBarLabel: 'My Profile',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account-box" color={'#800000'} size={size} />
          ),
        }}
         />
      </Tab.Navigator>
  );
}

const AppStack = createStackNavigator();

function AppStackScreen() {
  return (
    <AppStack.Navigator headerMode={false}>
     <AppStack.Screen name="Login" component={LoginStackScreen} />
     <AppStack.Screen name="numberFit" component={StackNavi} />
    </AppStack.Navigator>
  );
}


const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <View style={styles.container}>
    <NavigationContainer>
      <AppStackScreen />
    </NavigationContainer>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: "#FFF",
      marginTop: '10%'
  }
})