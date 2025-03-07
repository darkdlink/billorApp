import React, { useEffect } from 'react';
import AppNavigator from './navigation/AppNavigator';
import firebase from '@react-native-firebase/app'; 
import { LogBox } from 'react-native';

import { FIREBASE_API_KEY, FIREBASE_AUTH_DOMAIN, FIREBASE_PROJECT_ID, FIREBASE_STORAGE_BUCKET, FIREBASE_MESSAGING_SENDER_ID, FIREBASE_APP_ID, FIREBASE_MEASUREMENT_ID } from '@env';

const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
  appId: FIREBASE_APP_ID,
  measurementId: FIREBASE_MEASUREMENT_ID
};

const App = () => {
    useEffect(() => {
      console.log('App component mounted');
      console.log('Firebase apps length:', firebase.apps.length);
  
      if (!firebase.apps.length) {
        console.log('Firebase is not initialized, initializing...');
        try {
          firebase.initializeApp(firebaseConfig);
          console.log('Firebase initialized successfully');
        } catch (error: any) {
          console.error('Error initializing Firebase:', error);
        }
      } else {
        console.log('Firebase is already initialized');
      }
    }, []);
  
     useEffect(() => {
      LogBox.ignoreLogs(['new NativeEventEmitter']);
     }, [])
  
    return (
      <AppNavigator />
    );
  };
  

export default App;