import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image } from 'react-native';
import { firebase } from '@firebase/app';
import Constants from 'expo-constants';
import firestore from '../firebase';
import '@firebase/auth';

function LoginScreen ({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function login() {
    await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        alert('Success');
        navigation.navigate('Main');
      })
      .catch((error) => {
        alert('Error: ' + error.message);
      });
  }

  useEffect(() => {
    async function CheckLogin() {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          navigation.navigate(Main);
        }
      });
    }
    CheckLogin();
  }, []);

  const handleLogin = () => {
    // Perform login logic here
    console.log('Logging in with email:', email, 'and password:', password);

    // Navigate to HomeScreen
    navigation.navigate('Main');
  };

  const handleRegister = () => {
    // Navigate to RegisterScreen
    navigation.navigate('Register');
  };

  const handleForgotPassword = () => {
    // Navigate to ForgotPasswordScreen
    navigation.navigate('Forgot');
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/login.png')} style={styles.logo} />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Login" onPress={login} color="pink" />
        <View style={styles.buttonSpacing} />
        <Button title="Register" onPress={handleRegister} color="pink" />
        <View style={styles.buttonSpacing} />
        <Button
          title="Forgot Password"
          onPress={handleForgotPassword}
          color="pink"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 30,
  },
  inputContainer: {
    width: '80%',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'black',
    backgroundColor: 'crimson',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'column',
    width: '80%',
  },
  buttonSpacing: {
    height: 10,
  },
});

export default LoginScreen;
