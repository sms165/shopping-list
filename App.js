import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, FlatList, Button, View } from 'react-native';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import {getFirestore, collection, onSnapshot, addDoc, query, where, initializeFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";

import {getAuth} from 'firebase/auth';


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


  useEffect(() => {
    
      // Create a query to get the shopping list belonging to the user
      const userListQuery = query(shoppingListRef);
      unsubscribe = onSnapshot(userListQuery, onCollectionUpdate);

    
    return () => {
      
    }
  }, []);

  
   

  return (
    <View style={styles.container}>
      <FlatList
        data={lists}
        renderItem={({ item }) =>
          <Text style={styles.item}>{item.name}: {item.items}</Text>}
      />
      
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
