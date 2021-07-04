import firebase from 'firebase/app'
import 'firebase/firestore'

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDGbceo1PN0tJd_IOoql1GOAkEYwP3cKVY",
    authDomain: "firestore-crud-react-c8b73.firebaseapp.com",
    projectId: "firestore-crud-react-c8b73",
    storageBucket: "firestore-crud-react-c8b73.appspot.com",
    messagingSenderId: "1062882805060",
    appId: "1:1062882805060:web:d1e34b628b9b3b07d0c311"
};
// Initialize Firebase
const fb = firebase.initializeApp(firebaseConfig);
export const db = fb.firestore()
