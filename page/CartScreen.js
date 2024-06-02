import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Button,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProductCard from '../components/Product'; // Import ProductCard component
import { firebase } from '@firebase/app';
import firestore from '../firebase';
import '@firebase/auth';

export default function Cart({ navigation }) {
  const [cuser, setCuser] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function CheckLogin() {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          setCuser(user);
          let collRef = firestore
            .collection('users')
            .doc(user.uid)
            .collection('cart');

          collRef.get().then((querySnap) => {
            const tempDoc = querySnap.docs.map((doc) => {
              return { id: doc.id, ...doc.data() };
            });
            setProducts(tempDoc);
            console.log(products);
          });
        }
      });
    }
    const unsub = navigation.addListener('focus', () => {
    CheckLogin();
  })
return unsub;
  }, [navigation]);



  async function RemoveProducts(id) {
    console.log('hello')
    
    let collRef = firestore
      .collection('users')
      .doc(cuser.uid)
      .collection('cart')
      .doc(id);

    await collRef.delete();
    alert('ลบสินค้าแล้ว');
  }

  async function ClearProduct() {
    let collRef = await firestore
      .collection('users')
      .doc(cuser.uid)
      .collection('cart');

    let orderRef = await firestore.collection('orders').add({
      userid: cuser.uid,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });

    collRef.get().then(async (querySnap) => {
      let tempDoc = await querySnap.forEach(async (doc) => {
        await orderRef.collection('products').add(doc.data());
        await collRef.doc(doc.id).delete();
      });
    });
    setProducts([]);
    alert('ลบสินค้าแล้ว');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selected Products:</Text>
      {products.length > 0 ? (
        products.map((item) => (
          <Button title={item.name} onPress={() => RemoveProducts(item.id)} />
        ))
      ) : (
        <Text style={styles.emptyText}>No selected products</Text>
      )}
      <TouchableOpacity style={styles.clearButton} onPress={ClearProduct}>
        <Text style={styles.clearButtonText}>Clear</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
    paddingTop: 60,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  emptyText: {
    fontSize: 16,
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 20,
  },
  selectedProductText: {
    fontSize: 16,
  },
  clearButton: {
    backgroundColor: 'red',
    alignSelf: 'center',
    padding: 10,
    marginTop: 10,
  },
  clearButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});
