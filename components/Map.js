import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import * as Location from 'expo-location';


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
    // getLocation
    const getLocation = () => {
      fetch(`http://www.mapquestapi.com/geocoding/v1/address?key=JM4wYxQUeKUvwlYha46wOCwAGEJCq94D&location=${address}`)
      .then(response => response.json())
      .then(data =>  {
          setRegion({...region, 
            latitude: data.results[0].locations[0].latLng.lat,
            longitude: data.results[0].locations[0].latLng.lng});
          })
      .catch(error => console.error)
    };
    // search current location
    useEffect(() => {
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('No permission to get location')
          return;
        }
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
      })();
    }, []);
      
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
      >
        <Marker 
        coordinate={{
          latitude: region.latitude,
          longitude: region.longitude,
        }}
        title='Haaga-Helia'
        />
      </MapView>
      <TextInput 
        style={{ width: '100%', borderColor: 'gray', borderWidth: 1}}
        onChangeText={text => setAddress(text)}
        value={address}
      />
      <Button style={{ width:'100%' }} 
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
