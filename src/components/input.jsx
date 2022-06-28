import { View, Text, StyleSheet, TextInput } from 'react-native'
import React from 'react'

export default function Input({ placeholder, secureTextEntry, onChangeText, autoCapitalize, multiline}) {
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
      onChangeText={onChangeText}
      autoCapitalize={autoCapitalize}
      multiline={multiline}
    />
  )
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 20
  },
});