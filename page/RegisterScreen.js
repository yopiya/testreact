import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image } from 'react-native';
import { firebase } from '@firebase/app';
import firestore from '../firebase';
import '@firebase/auth';

function RegisterScreen ({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  async function handleRegister() {
    await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        alert('Register Successful');
      console.log("Hello?")
        let collRef = firestore.collection('users').doc(user.user.uid);
       
        collRef.set({
          name: name,
        });
      })
      .catch((error) => {
        console.log('Registration error:', error.message);
      });
  };
  return (
    <View style={styles.container}>
      <Image source={require('../assets/register.png')} style={styles.logo} />
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
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Register" onPress={handleRegister} color="pink" />
        <View style={styles.buttonSpacing} />
        <Button title="Back" onPress={navigation.goBack} color="pink" />
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

export default RegisterScreen;
