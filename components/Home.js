import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Header, Card } from '@rneui/themed';

export default function App() {
  return (
    <View>
       <Header 
          backgroundColor='lightgreen'
          centerComponent={{
              text: 'Home',
              style:{
                  color:'white',
                  fontSize: 22,
                  fontWeight:'bold',
                  padding: 15
                  }
              }}
        />
      <View style={styles.homecard}>
        <Card.Title style={{marginTop: 15}}>About</Card.Title>
          <View style={{position:"relative",alignItems:"center"}}>  
            <Text> This is app that is build to store your favourite movies and also to search info about them.  
              The app also include mapview that let's you to search addresses. Currenlty the options to "give current location"
              and pin&save locations are under construction.
            </Text>            
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

