import React, {useState} from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import FormInput from '../../components/FormInput';
import FormButton from '../../components/FormButton';
import SocialButton from '../../components/SocialButton';


const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
    return (
        <View style={styles.container}>
            <Image 
              style = {styles.logo} 
              source={require('../../assets/logo.png')}
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
              onPress={() => alert('Sign In Clicked!')}
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

export default LoginScreen;

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