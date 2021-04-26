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
import Contacting from './src/screens/Contacting'
import TypeGame from './src/factory/TypeGame';
import TestSettings from './src/factory/TestSettings';
import TestLoader from './src/screens/TestLoadingScreen';
import PlayVideo from './src/screens/VideoScreen';
import VidLoader from './src/screens/VideoLoadingScreen';
import MyStudents from './src/screens/MyStudents';
import MyKids from './src/screens/MyKids';
// import Example from './src/screens/Appio';
import SignUp from './src/screens/RegistrationPage';
import UserSelect from './src/screens/UserSelect';
import ParentSignUp from './src/screens/RegPageParent';
import TeacherSignUp from './src/screens/RegPageTeacher';
import TestOverModal from './src/components/TestOverModal';
import TargetSumSettings from './src/factory/TargetSumSettings';
import TargetSumLoader from './src/screens/TargetSumLoading'; 



const LoginStack = createStackNavigator();

global.userType = 'teacher';

function LoginStackScreen() {
return (
  <LoginStack.Navigator headerMode={false}>
    <LoginStack.Screen name="Loading" 
    component={Loading}
    />
    <LoginStack.Screen name="Login" 
    component={LoginScreen}
     />
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
    <PlayStack.Screen name="Landing" component={IconNav}   options={{headerShown: false }}
    />
    <PlayStack.Screen name="SignUp" component={SignUp} options={{headerShown: false}}/>
    <PlayStack.Screen name="Countdown3" component={Countdown3} options={{headerShown: false,}}/>
    <PlayStack.Screen name="Countdown2" component={Countdown2} options={{headerShown: false}}/>
    <PlayStack.Screen name="Countdown1" component={Countdown1} options={{headerShown: false}}/>
    <PlayStack.Screen name="Go" component={Go} options={{headerShown: false}}/>
    <PlayStack.Screen name="Difficulty" component={DifficultyPage} options={() => ({
          title: 'Difficulty',
        headerStyle: {
          backgroundColor: 'blue',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },})}/>
    <PlayStack.Screen name="Load Video" component={VidLoader} options={{headerShown: false}}/>
    {/* <PlayStack.Screen name="Example" component={Example} options={{headerShown: false}}/> */}
    <PlayStack.Screen name="Video" component={PlayVideo} options={({navigation}) => ({
      headerLeft: (props) => (
        <HeaderBackButton
          {...props}
          label='Go Back'
          onPress={() => Alert.alert(
          "Exit Video",
          "Are you sure that you would like to exit the video?",
          [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel"
            },
            { text: "Yes", onPress: () => navigation.navigate('Difficulty') }
          ]
          )} 
        />),})}/>
    <PlayStack.Screen name="Load Test" component={TestLoader} options={{headerShown: false}} />
    <PlayStack.Screen name="Test" component={TestSettings}   options={({navigation}) => ({
      //  headerStyle: {
      //     backgroundColor: 'lightblue',
      //   },
      headerLeft: (props) => (
        <HeaderBackButton
          {...props}
          label='Quit?'
          onPress={() => Alert.alert(
  "Exit Game",
  "Are you sure that you would like to exit the test? Your score will still be recorded",
  [
    {
      text: "Cancel",
      onPress: () => console.log("Cancel Pressed"),
      style: "cancel"
    },
    { text: "Yes", onPress: () => navigation.navigate('Landing') }
  ]
)} 
/>),})}/>
<PlayStack.Screen name="TypeGame" component={TypeGame} options={{headerShown: false}} />
<PlayStack.Screen name="EndGame" component={TestOverModal} />
    <PlayStack.Screen name="Load" component={Loader} options={{headerShown: false}} />
    <PlayStack.Screen name="Quit" component={Quit} options={{headerShown: false}} />
    <PlayStack.Screen name="Challenge" component={Challenger} options={() => ({
          title: 'Challenge',
        headerStyle: {
          backgroundColor: 'violet',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },})}/>

    <PlayStack.Screen name="Game" component={MultiChoiceGame}  options={({navigation}) => ({
      title: 'Shuffle Mode',
        headerStyle: {
          backgroundColor: 'green',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
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
      { text: "Yes", onPress: () => navigation.navigate('Landing') }
    ]
  )} />
  
          
        ),
    })}
/> 
<PlayStack.Screen name="TargetSumLoad" component={TargetSumLoader} options={{headerShown: false}} />
<PlayStack.Screen name="TargetSum" component={TargetSumSettings}  options={({navigation}) => ({
   title: 'Target Sum',
        headerStyle: {
          backgroundColor: 'blue',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
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
      { text: "Yes", onPress: () => navigation.navigate('Landing') }
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

const SetAssignmentStack = createStackNavigator();

function SetAssignmentStackScreen() {
  return (
    <SetAssignmentStack.Navigator>
      <SetAssignmentStack.Screen name="Set Assignments" component={SetHomework} options={() => ({
            headerLeft: () => {
      return null}, title: 'Set Assignments',
          headerStyle: {
            backgroundColor: '#483D8B',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },})}/>
    </SetAssignmentStack.Navigator>
  );
  }

  const MyStudentsStack = createStackNavigator();

function MyStudentsStackScreen() {
  return (
    <MyStudentsStack.Navigator>
      <MyStudentsStack.Screen name="My Students" component={MyStudents} options={() => ({
            headerLeft: () => {
      return null}, title: 'MyStudents',
          headerStyle: {
            backgroundColor: '#8FBC8F',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },})}/>
      <MyStudentsStack.Screen name="Student Data" component={StatsScreen} options={() => ({
            headerLeft: () => {
      return null}, title: 'Statistics',
          headerStyle: {
            backgroundColor: '#8FBC8F',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },})}/>
    </MyStudentsStack.Navigator>
  );
  }

  const ContactStack = createStackNavigator();

  function ContactStackScreen() {
    return (
      <ContactStack.Navigator>
        <ContactStack.Screen name="Contact" component={Contacting} options={() => ({
              headerLeft: () => {
        return null}, title: 'Contact',
            headerStyle: {
              backgroundColor: '#483D8B',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },})}/>
      </ContactStack.Navigator>
    );
    }

    const MyKidsStack = createStackNavigator();

    function MyKidsStackScreen() {
      return (
        <MyKidsStack.Navigator>
          <MyKidsStack.Screen name="My Kids" component={MyKids} options={() => ({
                headerLeft: () => {
          return null}, title: 'My Kids',
              headerStyle: {
                backgroundColor: '#8FBC8F',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },})}/>
        </MyKidsStack.Navigator>
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

function StackNaviParent() {
  return (
      <TabParent.Navigator>
        <TabParent.Screen name="My Kids" component={MyKidsStackScreen} 
          options={{
          tabBarLabel: 'My Kids',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account-supervisor" color={'#8FBC8F'} size={size} />
          ),
        }}
          />
                    <TabParent.Screen name="Contact" component={ContactStackScreen} 
          options={{
          tabBarLabel: 'Contact',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="forum" color={'#483D8B'} size={size} />
          ),
        }}
          />
                  <TabParent.Screen name="Profile" component={ProfileStackScreen} 
          options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account-box" color={'#800000'} size={size} />
          ),
        }}
          />
      </TabParent.Navigator>
  );
  }

  function StackNaviTeacher() {
    return (
        <TabTeacher.Navigator>
          <TabTeacher.Screen name="My Students" component={MyStudentsStackScreen} 
            options={{
            tabBarLabel: 'My Students',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="clipboard-list" color={'#8FBC8F'} size={size} />
            ),
          }}
            />

                      <TabTeacher.Screen name="Set Assignments" component={SetAssignmentStackScreen} 
            options={{
            tabBarLabel: 'Set Assignments',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="book-open" color={'#483D8B'} size={size} />
            ),
          }}
            />
                      <TabTeacher.Screen name="Profile" component={ProfileStackScreen} 
            options={{
            tabBarLabel: 'Profile',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="account-box" color={'#800000'} size={size} />
            ),
          }}
            />
        </TabTeacher.Navigator>
    );
    }

const AppStack = createStackNavigator();

function AppStackScreen() {
return (
  <AppStack.Navigator >
    <AppStack.Screen name="LoginStackScreen" component={LoginStackScreen} options={{headerShown: false}}/>
    <AppStack.Screen name="UserSelect" component={UserSelect} options={() => ({
          title: 'Choose your User',
        headerStyle: {
          backgroundColor: 'blue',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },})}/>
    <AppStack.Screen name="SignUp" component={SignUp} options={() => ({
          title: 'Enter your details',
        headerStyle: {
          backgroundColor: 'blue',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },})}/>
    <AppStack.Screen name="ParentSignUp" component={ParentSignUp} options={() => ({
          title: 'Enter your details',
        headerStyle: {
          backgroundColor: 'blue',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },})}/>
    <AppStack.Screen name="TeacherSignUp" component={TeacherSignUp} options={() => ({
          title: 'Enter your details',
        headerStyle: {
          backgroundColor: 'blue',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },})}/>
    <AppStack.Screen name="numberFit" component={StackNavi} options={{headerShown: false}}/>
  </AppStack.Navigator>
);
}

const AppStackParent = createStackNavigator();

function AppStackScreenParent() {
return (
  <AppStackParent.Navigator >
    <AppStackParent.Screen name="LoginStackScreen" component={LoginStackScreen} options={{headerShown: false}}/>
    <AppStackParent.Screen name="UserSelect" component={UserSelect} options={() => ({
          title: 'Choose your User',
        headerStyle: {
          backgroundColor: 'blue',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },})}/>
    <AppStackParent.Screen name="SignUp" component={SignUp} options={() => ({
          title: 'Enter your details',
        headerStyle: {
          backgroundColor: 'blue',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },})}/>
    <AppStackParent.Screen name="ParentSignUp" component={ParentSignUp} options={() => ({
          title: 'Enter your details',
        headerStyle: {
          backgroundColor: 'blue',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },})}/>
    <AppStackParent.Screen name="TeacherSignUp" component={TeacherSignUp} options={() => ({
          title: 'Enter your details',
        headerStyle: {
          backgroundColor: 'blue',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },})}/>
    <AppStackParent.Screen name="numberFitParent" component={StackNaviParent} options={{headerShown: false}}/>
  </AppStackParent.Navigator>
);
}

const AppStackTeacher = createStackNavigator();

function AppStackScreenTeacher() {
return (
  <AppStackTeacher.Navigator >
    <AppStackTeacher.Screen name="LoginStackScreen" component={LoginStackScreen} options={{headerShown: false}}/>
    <AppStackTeacher.Screen name="UserSelect" component={UserSelect} options={() => ({
          title: 'Choose your User',
        headerStyle: {
          backgroundColor: 'blue',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },})}/>
    <AppStackTeacher.Screen name="SignUp" component={SignUp} options={() => ({
          title: 'Enter your details',
        headerStyle: {
          backgroundColor: 'blue',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },})}/>
    <AppStackTeacher.Screen name="ParentSignUp" component={ParentSignUp} options={() => ({
          title: 'Enter your details',
        headerStyle: {
          backgroundColor: 'blue',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },})}/>
    <AppStackTeacher.Screen name="TeacherSignUp" component={TeacherSignUp} options={() => ({
          title: 'Enter your details',
        headerStyle: {
          backgroundColor: 'blue',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },})}/>
    <AppStackTeacher.Screen name="numberFitTeacher" component={StackNaviTeacher} options={{headerShown: false}} />
  </AppStackTeacher.Navigator>
);
}

const Tab = createBottomTabNavigator();
const TabParent = createBottomTabNavigator();
const TabTeacher = createBottomTabNavigator();


export default function App() {
  if (global.userType === 'student')
return (
  <NavigationContainer>
    <AppStackScreen />
  </NavigationContainer>
);
if (global.userType === 'parent')
return (
  <NavigationContainer>
    <AppStackScreenParent />
  </NavigationContainer>
);
if (global.userType === 'teacher')
return (
  <NavigationContainer>
    <AppStackScreenTeacher />
  </NavigationContainer>
);
}


const styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: "#FFF",
    marginTop: '20%'
}
})