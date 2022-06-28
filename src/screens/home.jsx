import { View, Text, StatusBar, SafeAreaView, ScrollView, Pressable, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../../App';

export default function Home({ navigation, router, user }) {
  console.log("homeUser--->", user)
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'notes'), where("uid", "==", user.uid));

    const noteListenerSubscription = onSnapshot(q, (querySnapshot) => {
      const list = [];
      querySnapshot.forEach((document) => {
        list.push(document.data());
      });
      setNotes(list);
    })
    return noteListenerSubscription;
  }, []);

  console.log("notes--->", notes);

  const renderItem = ({ item }) => {
    const { title, description, color } = item;
    return (
      <Pressable style={{ backgroundColor: color, marginBottom: 10, borderRadius: 12, padding: 10 }}>
        <Text style={{ fontSize: 20, color: "#fff" }}>{title}</Text>
        <Text style={{ fontSixe: 14, color: "#fff", marginTop: 15 }}>{description}</Text>
      </Pressable>
    )
  }

  const onPressCreate = () => {
    navigation.navigate("Create");
  }
  return (
    <SafeAreaView style={{ marginTop: StatusBar.currentHeight, flex: 1 }}>
      <ScrollView>
        <View style={{ flexDirection: "row", justifyContent: "space-between", padding: 20 }}>
          <Text>My Notes</Text>
          <Pressable onPress={onPressCreate}>
            <AntDesign name="pluscircleo" size={24} color="black" />
          </Pressable>
        </View>

        <FlatList
          data={notes}
          renderItem={renderItem}
          keyExtractor={(item) => item.title}
          contentContainerStyle={{ padding: 20 }}
        />
      </ScrollView>
    </SafeAreaView>
  )
}