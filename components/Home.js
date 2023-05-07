import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Header, Card, Divider } from '@rneui/themed';

/*
TODO
Home: järkevä info
Movielist: Järkevä käyttis
Search: Haku nimellä, genrellä yms.
Map: Siisti käyttistä
*/
export default function App() {
  return (
    <View>
       <Header 
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
        <View 
        style={{
          borderWidth: 1, 
          borderRadius:20, 
          alignItems: 'center',
          justifyContent: 'center', 
          padding: 10,
          margin:50,
          
         }}>
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
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
