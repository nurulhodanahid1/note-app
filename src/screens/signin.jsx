import { View, Text, StatusBar, SafeAreaView, Image, TextInput, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import Button from '../components/Button';
import Input from '../components/input';

export default function Signin({navigation}) {
    const signin = () => {
        console.log("clicked")
    }
    return (
        <SafeAreaView style={{ marginTop: StatusBar.currentHeight, flex: 1 }}>
            <Image style={{ alignSelf: "center", height: 150, width: 320 }} source={require("../../assets/signin.jpg")} />
            <Text style={{ fontSize: 18, fontWeight: "bold", textAlign: "center" }}>Never Forget Your Notes</Text>
            <View style={{ paddingHorizontal: 18, paddingVertical: 26 }}>
                <Input placeholder='email address' />
                <Input
                    placeholder='password'
                    secureTextEntry
                />
                <Button onPress={signin} title={"Sign in"} customStyles={{alignSelf: "center", marginTop: 20}} />
            </View>
            <View style={{
                flex: 1,
                justifyContent: "flex-end",
                alignItems: "center",
                paddingBottom: 12
            }}>
                <Pressable onPress ={() => {navigation.navigate("Signup")}}>
                    <Text>Don't have an account? {" "}
                        <Text style={{color: "green", fontWeight: "bold"}}>
                        Sign up</Text></Text>
                </Pressable>
            </View>
        </SafeAreaView>
    )
}