import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, FlatList, Button, View } from 'react-native';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import {getFirestore, collection, onSnapshot, addDoc, query, where, initializeFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";

import {getAuth, onAuthStateChanged, signInAnonymously} from 'firebase/auth';


import {decode, encode} from 'base-64'

if (!global.btoa) {  global.btoa = encode }

if (!global.atob) { global.atob = decode }

const firebaseConfig ={
  apiKey: "AIzaSyDqZv7cGkkawuF4Hy2uXhKCY0OD384uQY0",
  authDomain: "shopping-list-f6f8e.firebaseapp.com",
  projectId: "shopping-list-f6f8e",
  storageBucket: "shopping-list-f6f8e.appspot.com",
  messagingSenderId: "610827837515",
  appId: "1:610827837515:web:30832bb1205c89326aadce",
  measurementId: "G-QHF1CMB9JB"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db= initializeFirestore(app, {
  experimentalForceLongPolling: true,
});

//const db = getFirestore(app);
// const analytics = getAnalytics(app);



export default function App() {
  const [lists, setLists] = useState([]);
  const [uid, setUid]= useState();
  const [loggedInText, setLoggedInText]= useState('Please wait. You’re being authenticated');

// Create reference to the shopping list collection on firestore
  const shoppingListRef = collection(db, 'shoppinglists');

  const onCollectionUpdate = (querySnapshot) => {
    const lists = [];
    querySnapshot.forEach((doc) => {
      var data = doc.data();
      lists.push({
        name: data.name,
        items: data.items.toString(),
      });
    });
    setLists(lists);
  }

  const addList =() => {
    addDoc(shoppingListRef,{
      name: 'TestList',
      items: ['eggs', 'pasta', 'veggies'],
      uid: uid
    });
  }


  useEffect(() => {

    const auth = getAuth();
    
     const authUnsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        await signInAnonymously(auth);
      
    

      // Set states for user uid and logged in text
      setUid(user.uid);
      setLoggedInText('Hello there!');
    

      // Create a query to get the shopping list belonging to the user
      const userListQuery = query(shoppingListRef, where("uid", "==", uid));
     const unsubscribe= onSnapshot(userListQuery, onCollectionUpdate);
      }
    });

    return () => {
      authUnsubscribe();
      
      
    }
  }, []);

  
   

  return (
    <View style={styles.container}>
      <Text>{loggedInText}</Text>
      <FlatList
        data={lists}
        renderItem={({ item }) =>
          <Text style={styles.item}>{item.name}: {item.items}</Text>}
      />
      <Button onPress={addList} title='Add list' />
    </View> 
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 40,
  },
  item: {
    fontSize: 20,
    color: 'blue',
  },
  text: {
    fontSize: 30,
  }
});
