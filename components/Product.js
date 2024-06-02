import React, { useEffect, useState } from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import firestore from '../firebase';
import { firebase } from '@firebase/app';
import '@firebase/auth';


export default function ProductCard(props){
  const [cuser, setCuser] = useState(null);

  async function Order(id, name){
    alert('Added!!');
      let docRef = firestore.collection('users').doc(cuser.uid).collection('cart');
console.log("cart added");
      docRef.add({
        name: name,
        prodid: id
      });
  }
  
  useEffect(()  => {

    async function CheckLogin() {
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    setCuser(user);
  console.log("Product");
  }
});
    }

    CheckLogin();

  }, []);

  return props.showInStock && props.stock === 0 ? null : (
    <TouchableOpacity onPress={() => Order(props.id, props.name)}>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image style={styles.logo} source={{ uri: props.picture }} />
        </View>
        <Text style={styles.paragraph}>
          {'\n'}
          {props.name} {'\n'}
          <Text
            style={[
              styles.text,
              { color: 'grey', transform: [{ rotate: '90deg' }] },
            ]}
          >
            จำนวนคงเหลือ:
          </Text>{' '}
          {props.stock} {'\n'}
          <Text style={[styles.text, { color: 'red' }]}>${props.price}</Text>{' '}
          {'\n'}
          {'\n'}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'flex-start',

    marginVertical: 10,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 5,
  },
logoContainer: {
  alignItems: 'center',
  justifyContent: 'center',
  height: 100, 
},
    logo: {
    width: 100,
    height: 100,
      alignItems: 'center',
  justifyContent: 'center',
  },
   paragraph: {
    fontSize: 16,
    textAlign: 'left',
  },
  text: {
    fontSize: 12,
    textAlign: 'left',
  },
});
