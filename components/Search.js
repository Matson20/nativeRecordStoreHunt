import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Image, FlatList, Alert } from 'react-native';
import { Header, Card, Divider, Button } from '@rneui/themed';
import { StatusBar } from 'expo-status-bar';


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
  
  return (

    <View>
      <StatusBar 
            backgroundColor=''
            />
      <Header 
          backgroundColor='lightgreen'
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
        style={styles.movielistcard}>
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
    container: 
    {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    homecard: 
    {
      borderWidth: 1, 
      borderRadius:20, 
      alignItems: 'center',
      justifyContent: 'center', 
      padding: 10,
      margin:50,
    },
    movielistcard:
    {
        borderWidth: 1, 
        borderRadius:20, 
        alignItems: 'center',
        justifyContent: 'center', 
        padding: 10,
        margin:10,
        
       },
    movielistAdd:
    {
        marginTop: 10, 
        fontSize: 18, 
        width: 200, 
        borderColor: 'gray', 
        borderWidth: 1, 
        borderRadius: 10, 
        textAlign:'center'
    },
    input: 
    {
      fontSize: 18,
      textAlign: 'center',
      alignSelf: 'center',
      width: 200,
      borderColor: 'grey',
      borderWidth: 1,
      margin: 5,
      borderRadius:10
    },
    button: 
    {
      marginBottom: 15
    }
  });
