import {initializeApp} from 'firebase/app';
import {getDatabase} from 'firebase/database';
import {initializeAuth, getReactNativePersistence, onAuthStateChanged} from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import {APIKEY, AUTHDOMAIN, DATABASEURL, PROJECTID, STORAGEBUCKET, MESSAGINGSENDERID, APPID, MEASUREMENTID} from "@env";
import { useState, useEffect } from 'react';

const firebaseConfig = {
  apiKey: APIKEY,
  authDomain: AUTHDOMAIN,
  databaseURL: DATABASEURL,
  projectId: PROJECTID,
  storageBucket: STORAGEBUCKET,
  messagingSenderId: MESSAGINGSENDERID,
  appId: APPID,
  measurementId: MEASUREMENTID
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

function useAuth(){
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if(user){
        setCurrentUser(user.uid);
      }else{
        setCurrentUser(null);
      }
    });
  }, []);

  return currentUser;
}

export {auth, database, useAuth};
