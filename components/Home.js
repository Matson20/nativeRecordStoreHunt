import React, { useEffect, useState} from 'react';
import { View, Text, TextInput, Button, FlatList, Alert } from 'react-native';

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

export default function HomeScreen() {

    const [artist, setArtist] = useState('');
    const [recordName, setRecordName] = useState('');
    const [recordLabel, setRecordLabel] = useState('');
    const [releaseYear, setReleaseYear] = useState('');
    const [items, setItems] = useState([]);

    useEffect(() => {
        const itemsRef = ref(database, 'items/');
        onValue(itemsRef, (snapshot) => {
            const data = snapshot.val();
            const keys = Object.keys(data);
            const dataWithKeys = Object.values(data).map((obj, index) => {
                return {...obj, key: keys[index] }
            })
            setItems(dataWithKeys);
        })
    }, []);

    const saveItem = () => {
        if (artist && recordName && recordLabel && releaseYear) {
            push(ref(database, 'items/'), { 
                'artist': artist, 'recordName': recordName, 'recordLabel': recordLabel, 'releaseYear': releaseYear 
            });
        }
        else {
            Alert.alert('Error', 'Type product and release info first');
        }
    }

    const deleteItem = (key) => {
        Alert.alert(
            'Delete',
            'You are about to delete record from the list', [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel'
                },
                {
                    text: 'Yes',
                    onPress: () => remove(ref(database, `items/${key}`))
                }
            ]
        )}
        


    return (
        <View>
            <TextInput 
                placeholder='Artist'
                style={{marginTop: 30, fontSize: 18, width: 200, borderColor: 'gray', borderWidth: 1}}
                onChangeText={(artist) => setArtist(artist)}
                value={artist}
            />
            <TextInput 
                placeholder='Name of the record'
                style={{marginTop: 30, fontSize: 18, width: 200, borderColor: 'gray', borderWidth: 1}}
                onChangeText={(recordName) => setRecordName(recordName)}
                value={recordName}
            />
            <TextInput 
                placeholder='Label'
                style={{marginTop: 30, fontSize: 18, width: 200, borderColor: 'gray', borderWidth: 1}}
                onChangeText={(recordLabel) => setRecordLabel(recordLabel)}
                value={recordLabel}
            />
            {/*TODO Validoi että vuosi syöte on numero eikä string */}
             <TextInput 
                placeholder='Release year'
                style={{marginTop: 30, fontSize: 18, width: 200, borderColor: 'gray', borderWidth: 1}}
                onChangeText={(releaseYear) => setReleaseYear(releaseYear)}
                value={releaseYear}
            />
            <Button onPress={saveItem} title="Save" /> 
            <FlatList style={{marginLeft : "5%"}}
                keyExtractor={(item, index) => index.toString()} 
                ListHeaderComponent={() => <Text>   Artist     |   Album    |     Label     |     Release year</Text>}
                renderItem={({item}) => 
                <View>
                    <Text style={{fontSize: 18}}>{item.artist} - {item.recordName}, {item.recordLabel}, {item.releaseYear}</Text>
                    <Text onPress={() => deleteItem(item.key)} style={{marginLeft:10, fontSize: 18, color: '#0000EE'}}>
                    delete
                    </Text>
                </View>} useState
                data={items} /> 
        </View>
    );
};
