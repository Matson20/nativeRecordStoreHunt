import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Image, FlatList, Alert } from 'react-native';
import { Header, Card, Divider, Button } from '@rneui/themed';


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

    <View>
      <Header 
          centerComponent={{
              text: 'Movie search',
              style:{
                  color:'white',
                  fontSize: 22,
                  fontWeight:'bold',
                  padding: 15
                  }
              }}
        />
        <View>
        <TextInput style={styles.input}
          placeholder='Search movies'
          value={keyword}
          onChangeText={text => setKeyword(text)}
        />
        <Button 
          title='SEARCH'
          onPress={getMovie}
          buttonStyle={{
            backgroundColor: 'lightgreen',
            borderRadius:10,
            width: 100,
            alignSelf: 'center'
          }}
        />
      </View>
      <View 
        style={{
          borderWidth: 1, 
          borderRadius:20, 
          alignItems: 'center',
          justifyContent: 'center', 
          padding: 10,
          margin:10,
          
         }}>
        <Card.Title style={{marginTop: 15}}>{movieInfo.Title}  {movieInfo.Year}</Card.Title>
        <Divider width={1} color='red'/>
            <View style={{position:"relative",alignItems:"center"}}>
              <Image 
                style={{height: 265, width: 165, margin:10}} 
                resizeMode='contain'
                source={{uri:movieInfo.Poster}}
                />  
                 <Text>{movieInfo.Director}  </Text>     
                 <Text>{movieInfo.Genre}</Text>         
            </View>
        
      </View>
      
    </View>
    
  );
}

const styles = StyleSheet.create({
    container: {
      flex:1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    input: {
      fontSize: 18,
      textAlign: 'center',
      alignSelf: 'center',
      width: 200,
      borderColor: 'grey',
      borderWidth: 1,
      margin: 5,
      borderRadius:10
    },
    button: {
      marginBottom: 15
    }
  });
