import { firebase } from '@firebase/app';
import '@firebase/firestore';

var firebaseConfig = {
  apiKey: "AIzaSyDcksY5hgnEAKclyqTFYAR1Wi1feS_XJWw",
  authDomain: "delta-wonder-359906.firebaseapp.com",
  projectId: "delta-wonder-359906",
  storageBucket: "delta-wonder-359906.appspot.com",
  messagingSenderId: "325509910674",
  appId: "1:325509910674:web:4bb1b8df6aebab03c9564b"
};

firebase.initializeApp(firebaseConfig);

var firestore = firebase.firestore();

export default firestore;
