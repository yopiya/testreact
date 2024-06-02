import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image } from 'react-native';
import { firebase } from "@firebase/app";
import firestore from '../firebase';
import '@firebase/auth';

const ForgotScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');


  async function ResetPass() {
    await firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then((user) => {
        alert('Email Sent');
        navigation.navigate('Login');
      })
      .catch((error) => {
        console.log('Registration error:', error.message);
      });
  }

  const handleLogin = () => {

    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/email.png')} style={styles.logo} />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Reset Password" onPress={ResetPass} color="pink" />
        <View style={styles.buttonSpacing} />
        <Button title="Back" onPress={handleLogin} color="pink" />
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
    width: 200,
    height: 150,
    marginBottom: 30,
    alignItems: 'center',
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

export default ForgotScreen;
