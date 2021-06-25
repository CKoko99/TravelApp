import '../styles/globals.css'
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { Provider } from 'react-redux';
import store from '../store/store';
import Layout from '../Components/Layout/Layout';

var firebaseConfig = {
  apiKey: "AIzaSyB7LIl-iC-5snjKI-nrMZfZoSf3hdtZNtg",
  authDomain: "cktravels-57290.firebaseapp.com",
  projectId: "cktravels-57290",
  storageBucket: "cktravels-57290.appspot.com",
  messagingSenderId: "530197763687",
  appId: "1:530197763687:web:19af61bece184d914026c2"
};
// Initialize Firebase

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
  console.log("firebase 1")
}else {
  firebase.app(); // if already initialized, use that one
  console.log("firebase 2")
}
export const db = firebase.firestore()

db.settings({ timestanmpsInSnapshots: true, merge: true})

function MyApp({ Component, pageProps }) {
  return <Provider store={store}><Layout><Component {...pageProps} /></Layout></Provider>
}

export default MyApp
