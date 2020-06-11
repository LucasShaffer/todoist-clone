import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = firebase.initializeApp({
  apiKey: 'AIzaSyCLLAFXV9VaEkxHZD1bKy48E0hEPyLxRfI',
  authDomain: 'todoist-clone-d27ad.firebaseapp.com',
  databaseURL: 'https://todoist-clone-d27ad.firebaseio.com',
  projectId: 'todoist-clone-d27ad',
  storageBucket: 'todoist-clone-d27ad.appspot.com',
  messagingSenderId: '686528340527',
  appId: '1:686528340527:web:37528e23f54ab92b549cda',
});

export { firebaseConfig as firebase };
