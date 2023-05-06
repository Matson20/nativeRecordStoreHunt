import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, Image, FlatList, Alert } from 'react-native';
import MapView, { Callout } from 'react-native-maps';
import { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

import { initializeApp } from 'firebase/app';
import { getDatabase, push, remove, ref, onValue } from 'firebase/database';
   
const firebaseConfig = {
    apiKey: "AIzaSyCkcGTchJ2hqFh2Wbi7ua0Z6aFcnuanAC4",
    authDomain: "nativefindrecords.firebaseapp.com",
    databaseURL: "https://nativefindrecords-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "nativefindrecords",
    storageBucket: "nativefindrecords.appspot.com",
    messagingSenderId: "734889960044",
    appId: "1:734889960044:web:eade826216c6cdccbdae49"
  };
  
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);


export default function Map() {
    
    const [keyword, setKeyword] = useState('');
    const [movieInfo, setMovieInfo] = useState([]);
 

    // getLocation
    const getMovie= () => {
      fetch(`http://www.omdbapi.com/?t=${keyword}&apikey=c6ff77dc`)
      .then(response => response.json())
      .then(data =>  setMovieInfo(data))
      .catch(error => console.error(error))
    };
  
    console.log(movieInfo.Title);
    console.log(movieInfo.Year);

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        
            <View>
              <Text>{movieInfo.Title}  {movieInfo.Year}  {movieInfo.Director}  {movieInfo.Genre}</Text>
              <Image 
                style={{height: 265, width: 165}} 
                source={{uri:movieInfo.Poster}}
                />                
            </View>
        
      </View>
      <View>
        <TextInput style={styles.input}
          placeholder='type'
          value={keyword}
          onChangeText={text => setKeyword(text)}
        />
        <Button 
          style={styles.button}
          title='SEARCH'
          onPress={getMovie}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      marginTop: 30,
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    input: {
      fontSize: 18,
      width: 200,
      borderColor: 'grey',
      borderWidth: 1,
      marginBottom: 5
    },
    button: {
      marginBottom: 5
    }
  });
