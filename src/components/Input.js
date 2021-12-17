import React from "react";
// import styled from 'styled-components/native';
import { Dimensions, StyleSheet, TextInput } from "react-native";
import { theme } from "../theme";
const Input = ({
  value,
  placeholder,
  onChangeText,
  onSubmitEditting,
  onBlur,
}) => {
  return (
    <TextInput
      value={value}
      onChangeText={onChangeText}
      onSubmitEditing={onSubmitEditting}
      style={styles.input}
      placeholder={placeholder}
      maxLength={50}
      placeholderTextColor={theme.main}
      autoCapitalize="none"
      autoCorrect={false}
      returnKeyType="done"
      keyboardAppearance="dark"
      onBlur ={onBlur}
    />
  );
};

const WIDTH = Dimensions.get("window").width - 40;

const styles = StyleSheet.create({
  input: {
    width: WIDTH,
    height: 60,
    marginVertical: 3,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 16,
    backgroundColor: theme.itemBackground,
    fontSize: 25,
    color: theme.text,
  },
});

export default Input;
