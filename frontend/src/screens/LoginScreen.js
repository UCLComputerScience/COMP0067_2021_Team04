import React, {useState, useEffect} from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import SocialButton from '../components/SocialButton';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const _storeData = async (userStr) => {
    try {
      
      await AsyncStorage.setItem(
        'user',
        userStr
      )
      ;
    } catch (error) {
      
    }
  };
  const userLogin = async()=>{
    navigation.navigate('numberFit');
    
    const {data: user} = await axios.post('http://54.171.167.5/api/v1/users/login',{
      "PK": "mathsqueen",
      "password": "test123"
  })
    
    const userString = JSON.stringify(user)
    _storeData(userString)
    
    
    
  }
    return (
        <View style={styles.container}>
            <Image 
              style = {styles.logo} 
              source={require('../imgs/logo.png')}
            />
            <FormInput
              labelValue={email}
              onChangeText={(userEmail) => setEmail(userEmail)}
              placeholderText="Email"
              iconType="user"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
            <FormInput
              labelValue={password}
              onChangeText={(userPassword) => setPassword(userPassword)}
              placeholderText="Password"
              iconType="lock"
              secureTextEntry={true}
            />
            <FormButton
              buttonTitle="SIGN IN"
              onPress={()=>{userLogin()}}
            />

            <TouchableOpacity style={styles.forgotButton} onPress={() => {}}>
              <Text style={styles.navButtonText}>FORGOT PASSWORD?</Text>
            </TouchableOpacity>

            <Text style={styles.textRegister}> ────── OR  ──────</Text>

            <SocialButton 
              buttonTitle="SIGN IN USING GOOGLE"
              btnType="google"
              color="#de4d41"
              backgroundColor="#f5e7ea"
              onPress={() => {}}
            />
            <TouchableOpacity style={styles.forgotButton} onPress={() => navigation.navigate('Signup')}>
                <Text style={styles.navButtonText}>NEW TO NUMBERFIT? JOIN HERE.</Text>
            </TouchableOpacity>
        </View>
      );
};

exports.LoginScreen = LoginScreen;


const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      paddingTop: 50
    },
    logo: {
      height: 100,
      width: 300,
      marginVertical: 20,
      resizeMode: 'cover',
    },
    text: {
      fontSize: 28,
      marginBottom: 10,
      fontWeight: '500',
      color: '#051d5f',
    },
    textRegister: {
      fontSize: 15,
      marginVertical: 10,
      fontWeight: '500',
      color: '#abb8c3',
    },
    navButton: {
      marginTop: 15,
    },
    forgotButton: {
      marginVertical: 15,
    },
    newAccountButton: {
      marginBottom: 36,
    },
    navButtonText: {
      fontSize: 18,
      fontWeight: '500',
      color: '#2e64e5',
    },
});