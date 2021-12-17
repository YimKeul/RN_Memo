import React, { useState } from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import IconButton from "./IconButton";
import { images } from "../images";
import { theme } from "../theme";
import Input from "./Input";

const Task = ({ item, deleteTask, toggleTask, updateTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(item.text);

  const _handleUpdateButtonPress = () => {
    setIsEditing(true);
  };

  const _onSubmitEditing = () => {
    if (isEditing) {
      const editedTask = Object.assign({}, item, { text });
      setIsEditing(false);
      updateTask(editedTask);
    }
  };
  const _onBlur = () =>{
   if(isEditing){
     setIsEditing(false)
     setText(item.text)
   }
  }
  return isEditing ? (
    <Input 
    value={text}
    onChangeText={text => setText(text)}
    onSubmitEditting={_onSubmitEditing}
    onBlur={_onBlur}
    />
  ) : (
    <View style={styles.Container}>
      <IconButton
        type={item.completed ? images.completed : images.uncompleted}
        id={item.id}
        onPressOut={toggleTask}
        completed={item.completed}
      />
      {/* {item.completed === false ? (
        <Text style={styles.Contents}>{item.text}</Text>
      ) : (
        <Text style={styles.UnContents}>{item.text}</Text>
      )} */}
      <Text style={{...styles.Contents , color : item.completed ? theme.done : theme.text, textDecorationLine : item.completed ? "line-through" : undefined }}>{item.text}</Text>
      {item.completed === false ? (
        <IconButton type={images.update} onPressOut={_handleUpdateButtonPress}/>
      ) : undefined}

      {/* <IconButton type={images.update}/> */}
      <IconButton
        type={images.delete}
        id={item.id}
        onPressOut={deleteTask}
        completed={item.completed}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.background,
    borderRadius: 10,
    padding: 5,
    marginVertical: 3,
  },
  Contents: {
    flex: 1,
    fontSize: Dimensions.get("window").width <= 320 ? 18 : 24,
    color: theme.text,
  },
  UnContents: {
    flex: 1,
    fontSize: Dimensions.get("window").width <= 320 ? 18 : 24,
    color: theme.done,
    textDecorationLine: "line-through",
  },
});

export default Task;
