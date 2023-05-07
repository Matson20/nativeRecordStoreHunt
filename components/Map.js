import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Alert } from 'react-native';
import MapView, { Callout } from 'react-native-maps';
import { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { Header, Button } from '@rneui/themed';

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
    // Location
    const [location, setLocation] = useState(null);
    // const address
    const [address, setAddress] = useState('');
    // const region
    const [region, setRegion] = useState({
      latitude: 60.21288,
      longitude: 25.14412,
      latitudeDelta: 0.0322,
      longitudeDelta: 0.0221,
    })

    const [marker, setMarker] = useState('');
// save pin
/*
    useEffect(() => {
      const markerRef = ref(database, 'markers/');
      onValue(markerRef, (snapshot) => {
          const data = snapshot.val();
          const keys = Object.keys(data);
          const dataWithKeys = Object.values(data).map((obj, index) => {
              return {...obj, key: keys[index] }
          })
          setMarker(dataWithKeys);
      })
  }, []);
*/
  const saveMarker = () => {
    if (latitude != null) {
        push(ref(database, 'markers/'), { 
             
        });
    }
    else {
        Alert.alert('Error', 'Type product and release info first');
    }
}

    // search current location
    useEffect(() => {
      const getPermissions = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('No permission to get location')
          return;
        }
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
        console.log(location);
        const currentLatitude = location.coords.latitude;
        const currentLongitude = location.coords.longitude;
        console.log(currentLatitude);
        console.log(currentLongitude);
      };
      getPermissions
    }, []);

    console.log(location);

    const savePin = null;

    // getLocation
    const getLocation = () => {
      fetch(`http://www.mapquestapi.com/geocoding/v1/address?key=7mH5mbdIImaFwPyE54ntt7mJxb3Mu5gb&location=${address}`)
      .then(response => response.json())
      .then(data =>  {
          setRegion({...region, 
            latitude: data.results[0].locations[0].latLng.lat,
            longitude: data.results[0].locations[0].latLng.lng});
          })
      .catch(error => console.error)
    };
    
    // pin and save locations
    // add info to pins

   

  return (
    // Set marker to your current location
    <View>
      <Header 
          backgroundColor='red'
          centerComponent={{
              text: 'MAPS / WORK IN PROGRESS',
              style:{
                  width:325,
                  color:'white',
                  fontSize: 22,
                  fontWeight:'bold',
                  padding: 15,
                  alignItems:'center'
                  }
              }}
        />
      <MapView
       style={{ height: '75%', width:'100%' }}
       region={{
         latitude: region.latitude,
         longitude: region.longitude,
         latitudeDelta: 0.0322,
         longitudeDelta: 0.0221
       }}
       onRegionChange={this.onRegionChange}
      >
        <Marker
        draggable
        coordinate={{
          latitude: region.latitude,
          longitude: region.longitude,
        }}
        >
          <Callout style={{width: '50%' ,padding: 5, borderColor: 'gray', borderWidth: 1}} >
            <Button
            style={{borderColor: 'gray', borderWidth: 1}} 
            title="Save"
            onPress={saveMarker}/>
            <Text>Toimiiko?</Text>
          </Callout>
        </Marker>
      
        <Marker 
        draggable
        coordinate={{
          latitude: region.latitude,
          longitude: region.longitude,
        }}
        title='Home'
        />
      </MapView>
      <TextInput 
        style={{ width: '70%', borderColor: 'gray', borderWidth: 1, borderRadius:10, alignSelf:'center'}}
        onChangeText={text => setAddress(text)}
        value={address}
      />
      <Button style={{ width:100 }} 
        title='SHOW'
        onPress={getLocation}
        buttonStyle={{
          backgroundColor: 'lightgreen',
          borderRadius:10,
          width: 150,
          alignSelf: 'center',
          marginBottom: 10
        }}
      />
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

