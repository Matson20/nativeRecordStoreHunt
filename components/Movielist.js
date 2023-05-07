import React, { useEffect, useState} from 'react';
import { View, Text, TextInput, FlatList, Alert } from 'react-native';
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

export default function HomeScreen() {

    const [name, setName] = useState('');
    const [genre, setGenre] = useState('');
    const [director, setDirector] = useState('');
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
        if (name && genre && director && releaseYear) {
            push(ref(database, 'items/'), { 
                'name': name, 'genre': genre, 'director': director, 'releaseYear': releaseYear 
            });
        }
        else {
            Alert.alert('Error', 'Type product and release info first');
        }
    }

    const deleteItem = (key) => {
        Alert.alert(
            'Delete',
            'You are about to delete movie from the list', [
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
        <View style={{}}>
            <Header 
                centerComponent={{
                    text: 'My movielist',
                    style:{
                        color:'white',
                        fontSize: 22,
                        fontWeight:'bold',
                        padding: 15
                        }
                    }}
            />
            <View style={{alignItems: 'center'}}>
                <TextInput 
                    placeholder='Name of the movie'
                    style={{marginTop: 30, fontSize: 18, width: 200, borderColor: 'gray', borderWidth: 1, borderRadius: 10, textAlign:'center'}}
                    onChangeText={(name) => setName(name)}
                    value={name}
                />
                <TextInput 
                    placeholder='Genre'
                    style={{marginTop: 30, fontSize: 18, width: 200, borderColor: 'gray', borderWidth: 1, borderRadius: 10, textAlign:'center'}}
                    onChangeText={(genre) => setGenre(genre)}
                    value={genre}
                />
                <TextInput 
                    placeholder='Director'
                    style={{marginTop: 30, fontSize: 18, width: 200, borderColor: 'gray', borderWidth: 1, borderRadius: 10, textAlign:'center'}}
                    onChangeText={(director) => setDirector(director)}
                    value={director}
                />
                {/*TODO Validoi että vuosi syöte on numero eikä string */}
                <TextInput 
                    placeholder='Release year'
                    style={{marginTop: 30, fontSize: 18, width: 200, borderColor: 'gray', borderWidth: 1, borderRadius: 10, textAlign:'center'}}
                    onChangeText={(releaseYear) => setReleaseYear(releaseYear)}
                    value={releaseYear}
                />
            </View>
            
            <Button onPress={saveItem} title="Save" 
                buttonStyle={{
                    backgroundColor: 'lightgreen',
                    borderRadius:10,
                    width: 150,
                    alignSelf: 'center',
                    marginTop: 5,
                    marginBottom: 5
                  }}
            /> 
            <FlatList style={{marginLeft : "5%"}}
                keyExtractor={(item, index) => index.toString()} 
                ListHeaderComponent={() => <Text style={{fontSize: 20, alignSelf: 'center', borderBottomWidth: 1}}>My movielist</Text>}
                renderItem={({item}) => 
                <View
                style={{
                    borderWidth: 1, 
                    borderRadius:20, 
                    alignItems: 'center',
                    justifyContent: 'center', 
                    padding: 10,
                    margin:10,
                    
                   }}>
                    <Card.Title>{item.name}, {item.releaseYear}</Card.Title>
                    <Text style={{fontSize: 18}}>By: {item.director}</Text>
                    <Text style={{fontSize: 18}}>Genre: {item.genre}</Text>
                    <Text onPress={() => deleteItem(item.key)} style={{marginLeft:10, fontSize: 18, color: '#0000EE'}}>
                    delete
                    </Text>
                </View>} useState
                data={items} /> 
        </View>
    );
};
