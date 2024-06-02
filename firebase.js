import { firebase } from '@firebase/app';
import '@firebase/firestore';

var firebaseConfig = {
  apiKey: 'AIzaSyARydTUvZr7Iyd77XmOLwglU14IZ1DtGnM',
  authDomain: 'lab8-daefe.firebaseapp.com',
  projectId: 'lab8-daefe',
  storageBucket: 'lab8-daefe.appspot.com',
  messagingSenderId: '610615260707',
  appId: '1:610615260707:web:02a18699c0b5c7306fa396',
  measurementId: 'G-XLPXV16HZP',
};

firebase.initializeApp(firebaseConfig);

var firestore = firebase.firestore();

export default firestore;
