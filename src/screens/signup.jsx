import { View, Text, StatusBar, SafeAreaView, Image, TextInput, StyleSheet, Pressable, ScrollView, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import Button from '../components/Button';
import Input from '../components/input';
import { showMessage, hideMessage } from "react-native-flash-message";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from '../../App';
import {
    addDoc,
    collection,
    getDoc,
    doc,
    onSnapshot,
    query,
    where
} from "firebase/firestore"


const genderOptions = ["Male", "Female"];

export default function Signup({ navigation }) {
    const [gender, setGender] = useState(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [loading, setLoading] = useState(false);

    const signup = async () => {
        setLoading(true);
        try {
            // Create user
            const result = await createUserWithEmailAndPassword(auth, email, password);
            // create user profile
            await addDoc(collection(db, 'users'), {
                name: name,
                email: email,
                age: age,
                gender: gender,
                uid: result.user.uid
            })
            setLoading(false)
        }
        catch (error) {
            console.log("error--->", error);
            showMessage({
                message: "Simple message",
                type: "danger",
            });
            setLoading(false);
        };
    }

    if (loading){
        return (
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator color="blue" size="large" />
          </View>
        )
      }

    return (
        <SafeAreaView style={{ marginTop: StatusBar.currentHeight, flex: 1 }}>
            <ScrollView>
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
                    <Input placeholder='full name' autoCapitalize={"words"} onChangeText={(text) => setName(text)} />
                    <Input placeholder='age' onChangeText={(text) => setAge(text)} />
                    <View style={{ marginVertical: 10 }}>
                        <Text>Select Gender</Text>
                    </View>
                    {
                        genderOptions.map((option) => {
                            const selected = option === gender;
                            return (
                                <Pressable onPress={() => setGender(option)} key={option} style={styles.radioContainer}>
                                    <View style={[styles.outerCircle, selected && styles.selectedOuterCircle]}>
                                        <View style={[styles.innerCircle, selected && styles.selectedInnerCircle]} />
                                    </View>
                                    <Text style={styles.radioText}>{option}</Text>
                                </Pressable>
                            )
                        })
                    }
                    <Button onPress={signup} title={"Sign up"} customStyles={{ alignSelf: "center", marginTop: 20 }} />
                </View>
                <View style={{
                    flex: 1,
                    justifyContent: "flex-end",
                    alignItems: "center",
                    paddingBottom: 12
                }}>
                    <Pressable onPress={() => { navigation.navigate("Signin") }}>
                        <Text>Already have an account? {" "}
                            <Text style={{ color: "green", fontWeight: "bold" }}>
                                Sign in</Text></Text>
                    </Pressable>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    radioContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
    },
    outerCircle: {
        height: 30,
        width: 30,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: "#cfcfcf",
        justifyContent: "center",
        alignItems: "center",
    },
    innerCircle: {
        height: 15,
        width: 15,
        borderRadius: 7.5,
        borderWidth: 1,
        borderColor: "#cfcfcf"
    },
    radioText: {
        marginLeft: 10,
    },
    selectedOuterCircle: {
        borderColor: "orange",
    },
    selectedInnerCircle: {
        borderColor: "orange",
        backgroundColor: "orange",
    }
});
