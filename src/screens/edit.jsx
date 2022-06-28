import { View, Text, Pressable, StyleSheet, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import Input from '../components/input';
import Button from '../components/Button';
import { auth, db } from '../../App';
import { doc, updateDoc } from "firebase/firestore";
import { showMessage } from 'react-native-flash-message';

const noteColorOptions = ["red", "blue", "green"];

export default function Edit({ navigation, route, user }) {
  const noteItem = route.params.item;
  console.log("noteItem--->", noteItem);

  const [title, setTitle] = useState(noteItem.title);
  const [description, setDescription] = useState(noteItem.description);
  const [noteColor, setNoteColor] = useState(noteItem.color);
  const [loading, setLoading] = useState(false);

  const onPressEdit = async () => {
    setLoading(true);
    try {
      // create note
      const updateNoteRef = doc(db, "notes", noteItem.id);
      await updateDoc(updateNoteRef, {
        title: title,
        description: description,
        color: noteColor,
        uid: user.uid
      });
      setLoading(false)
      showMessage({
        message: "note edited successfully",
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
        value={title}
      />
      <Input
        placeholder='Description'
        onChangeText={(text) => setDescription(text)}
        multiline={true}
        value={description}
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
          <Button onPress={onPressEdit} title={"Create"} customStyles={{ alignSelf: "center", marginTop: 50, width: "90%" }} />
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