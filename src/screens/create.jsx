import { View, Text, Pressable, StyleSheet, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import Input from '../components/input';
import Button from '../components/Button';
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
import { showMessage } from 'react-native-flash-message';

const noteColorOptions = ["red", "blue", "green"];

export default function Create({ navigation, route, user }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [noteColor, setNoteColor] = useState("blue");
  const [loading, setLoading] = useState(false);

  const onPressCreate = async () => {
    setLoading(true);
    try {
      // create note
      await addDoc(collection(db, 'notes'), {
        title: title,
        description: description,
        color: noteColor,
        uid: user.uid
      })
      setLoading(false)
      showMessage({
        message: "note crated successfully",
        type: "success"
      })
      navigation.goBack();
    }
    catch (error) {
      console.log("error--->", error);
      setLoading(false);
    };
  }

  return (
    <View style={{ marginHorizontal: 20, marginTop: 30 }}>
      <Input
        placeholder='Title'
        onChangeText={(text) => setTitle(text)}
      />
      <Input
        placeholder='Description'
        onChangeText={(text) => setDescription(text)}
        multiline={true}
      />
      <View style={{ marginVertical: 10 }}>
        <Text>Select note color</Text>
      </View>
      {
        noteColorOptions.map((option) => {
          const selected = option === noteColor;
          return (
            <Pressable onPress={() => setNoteColor(option)} key={option} style={styles.radioContainer}>
              <View style={[styles.outerCircle, selected && styles.selectedOuterCircle]}>
                <View style={[styles.innerCircle, selected && styles.selectedInnerCircle]} />
              </View>
              <Text style={styles.radioText}>{option}</Text>
            </Pressable>
          )
        })
      }
      {
        loading ?
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator color="blue" size="large" />
          </View> :
          <Button onPress={onPressCreate} title={"Create"} customStyles={{ alignSelf: "center", marginTop: 50, width: "90%" }} />
      }

    </View>
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