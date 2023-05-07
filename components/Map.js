import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
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
    <View style={styles.container}>
      <MapView
       style={{ height: '90%', width:'100%' }}
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
        style={{ width: '80%', borderColor: 'gray', borderWidth: 1, borderRadius:10}}
        onChangeText={text => setAddress(text)}
        value={address}
      />
      <Button style={{ width:100 }} 
        title='SHOW'
        onPress={getLocation}
      />
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
