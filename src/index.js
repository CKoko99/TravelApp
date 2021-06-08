import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { Provider } from 'react-redux';
import store from './store/store';

var firebaseConfig = {
  apiKey: "AIzaSyB7LIl-iC-5snjKI-nrMZfZoSf3hdtZNtg",
  authDomain: "cktravels-57290.firebaseapp.com",
  projectId: "cktravels-57290",
  storageBucket: "cktravels-57290.appspot.com",
  messagingSenderId: "530197763687",
  appId: "1:530197763687:web:19af61bece184d914026c2"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore()

db.settings({ timestanmpsInSnapshots: true})

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
