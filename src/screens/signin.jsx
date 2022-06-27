import { View, Text, StatusBar, SafeAreaView, Image, TextInput, StyleSheet, Pressable, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import Button from '../components/Button';
import Input from '../components/input';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../App';

export default function Signin({ navigation }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const login = async () => {
        setLoading(true);
        try {
            const result = await signInWithEmailAndPassword(auth, email, password);
            console.log("result--->", result)
            setLoading(false);
        }
        catch (error) {
            console.log("error--->", error);
            setLoading(false);
        };
    };

    if (loading){
        return (
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator color="blue" size="large" />
          </View>
        )
      }

    return (
        <SafeAreaView style={{ marginTop: StatusBar.currentHeight, flex: 1 }}>
            <Image style={{ alignSelf: "center", height: 150, width: 320 }} source={require("../../assets/signin.jpg")} />
            <Text style={{ fontSize: 18, fontWeight: "bold", textAlign: "center" }}>Never Forget Your Notes</Text>
            <View style={{ paddingHorizontal: 18, paddingVertical: 26 }}>
                <Input
                    placeholder='email address'
                    autoCapitalize={"none"}
                    onChangeText={(text) => setEmail(text)}
                />
                <Input
                    placeholder='password'
                    secureTextEntry
                    onChangeText={(text) => setPassword(text)}
                />
                <Button onPress={login} title={"Sign in"} customStyles={{ alignSelf: "center", marginTop: 20 }} />
            </View>
            <View style={{
                flex: 1,
                justifyContent: "flex-end",
                alignItems: "center",
                paddingBottom: 12
            }}>
                <Pressable onPress={() => { navigation.navigate("Signup") }}>
                    <Text>Don't have an account? {" "}
                        <Text style={{ color: "green", fontWeight: "bold" }}>
                            Sign up</Text></Text>
                </Pressable>
            </View>
        </SafeAreaView>
    )
}