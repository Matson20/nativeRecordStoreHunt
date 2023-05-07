import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';

import Map from './components/Map';
import Movielist from './components/Movielist';
import Search from './components/Search';
import Home from './components/Home';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'md-home';
          } else if (route.name === 'Movielist') {
            iconName = 'list';
          } else if (route.name === 'Map') {
            iconName = 'map';
          } else if (route.name === 'Search') {
            iconName = 'search'
          }
          return <Ionicons name={iconName} size={size} color={color}  />;
        },
          tabBarActiveTintColor: 'green',
          tabBarInactiveTintColor: 'lightgreen',
          headerShown:false
      })
        
      }>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Movielist" component={Movielist} />
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name="Map" component={Map} />
    </Tab.Navigator>
  </NavigationContainer>
  );
}


