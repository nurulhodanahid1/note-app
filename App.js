// import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, StatusBar, ActivityIndicator } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/screens/home';
import Signin from './src/screens/signin';
import Signup from './src/screens/signup';
import Create from './src/screens/create';
import Edit from './src/screens/edit';
import FlashMessage from "react-native-flash-message";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAhhgs5q-z-0hUplY8AZrWeuZHYi6ZPoxQ",
  authDomain: "note-app-6835f.firebaseapp.com",
  projectId: "note-app-6835f",
  storageBucket: "note-app-6835f.appspot.com",
  messagingSenderId: "761117209556",
  appId: "1:761117209556:web:67169ccda4964666265c41"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const firebase = !fb.apps.length ? fb.initializeApp(firebaseConfig) : fb.app()
export const auth = getAuth(app);
export const db = getFirestore(app);

const AppTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#fff"
  }
}

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   signOut(auth);
  // }, []);

  useEffect(() => {
    const authSubscription = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user)
        setLoading(false);
      } else {
        setUser(null);
        setLoading(false);
      }
    })
    return authSubscription;
  }, []);

  if (loading){
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator color="blue" size="large" />
      </View>
    )
  }

  return (
    <NavigationContainer theme={AppTheme}>
      <Stack.Navigator>
        {
          user ? (
            <>
              <Stack.Screen name="Home" options={{ headerShown: false }}>
                {(props) => <Home {...props} user={user} />}
              </Stack.Screen>
              <Stack.Screen name="Create">
                {(props) => <Create {...props} user={user} />}
              </Stack.Screen>
              <Stack.Screen name="Edit">
                {(props) => <Edit {...props} user={user} />}
              </Stack.Screen>
              {/* <Stack.Screen name="Edit" component={Edit} /> */}
            </>) : (
            <>
              <Stack.Screen name="Signin" component={Signin} options={{ headerShown: false }} />
              <Stack.Screen name="Signup" component={Signup} />
            </>)
        }
      </Stack.Navigator>
      <FlashMessage style={{ marginTop: StatusBar.currentHeight, flex: 1 }} position="top" />
    </NavigationContainer>
    // <View style={styles.container}>
    //   <Text>Open up App.js to start working on your app!</Text>
    //   <StatusBar style="auto" />
    // </View>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });