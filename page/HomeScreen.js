import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
  Button,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProductCard from '../components/Product'; // Import ProductCard component
import { firebase } from "@firebase/app";
import firestore from '../firebase';
import '@firebase/auth';

function HomeScreen({ navigation }) {
  const [prod, setProd] = useState([]);
  const [showAll, setShowAll] = useState(true);
  const [showInStock, setShowInStock] = useState(false);

  async function getProducts() {
    let collRef = firestore.collection('products');

    await collRef.get().then((querySnap) => {
      const tempDoc = querySnap.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });

      let filteredProducts = tempDoc;
      if (!showAll) {
        filteredProducts = filteredProducts.filter((product) => product.stock !== 0);
      }

      setProd(filteredProducts);
    });
  }

  useEffect(() => {
    getProducts();
  }, [showAll]);

  async function logout() {
    await firebase.auth().signOut();
    navigation.navigate('Login');
  }

  function handleShowAll() {
    setShowAll(true);
    setShowInStock(false);
  }

  function handleShowInStock() {
    setShowAll(false);
    setShowInStock(true);
  }

  return (
    <View>
      <View style={styles.filterButtons}>
        <Button
          title="All"
          onPress={handleShowAll}
          color={showAll ? '#0000ff' : '#cccccc'}
        />
        <Button
          title="In Stock"
          onPress={handleShowInStock}
          color={showInStock ? '#0000ff' : '#cccccc'}
        />
      </View>
      {prod.map((props) => (
        <ProductCard
          key={props.id}
          name={props.name}
          price={props.price}
          stock={props.stock}
          picture={props.pic}
          id={props.id}
          showInStock={showInStock}
        />
      ))}
      <Button title="Logout" onPress={() => logout()} />
    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  filterButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
});
