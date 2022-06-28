import { View, Text, StatusBar, SafeAreaView, ScrollView, Pressable } from 'react-native'
import React from 'react';
import { AntDesign } from '@expo/vector-icons';

export default function Home({ navigation, router, user }) {
  console.log("homeUser--->", user)
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
      </ScrollView>
    </SafeAreaView>
  )
}