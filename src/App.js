import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Dimensions,
} from "react-native";
import { theme } from "./theme";
import Input from "./components/Input";
import Task from "./components/Task";
import AsyncStorage from "@react-native-async-storage/async-storage";

const App = () => {
  const [newTask, setNewTask] = useState("");

  

  const _addTask = () => {
    const ID = Date.now().toString();
    const newTaskObject = {
      [ID]: { id: ID, text: newTask, completed: false },
    };
    // alert(`Add : ${newTask}`)
    setNewTask(""); //초기화
    _saveTasks({ ...tasks, ...newTaskObject });
  };

  const _handleTextChange = (text) => {
    setNewTask(text);
  };

  const _deleteTask = (id) => {
    const currentTasks = Object.assign({}, tasks);
    delete currentTasks[id];
    _saveTasks(currentTasks);
  };

  const [tasks, setTasks] = useState({});

  const _saveTasks = async (tasks) => {
    try {
      await AsyncStorage.setItem("tasks", JSON.stringify(tasks));
      setTasks(tasks);
    } catch (e) {
      console.error(e);
    }
  };

  const _toggleTask = (id) => {
    const currentTasks = Object.assign({}, tasks);
    currentTasks[id]["completed"] = !currentTasks[id]["completed"];
    _saveTasks(currentTasks);
  };

  const _updateTask = (item) => {
    const currentTasks = Object.assign({}, tasks);
    currentTasks[item.id] = item;
    _saveTasks(currentTasks);
  };

  const _onBlur = () => {
    setNewTask("");
  };

  const _loadTasks = async () => {
    const loadedTasks = await AsyncStorage.getItem("tasks");
    setTasks(JSON.parse(loadedTasks||'{}'));
  };

  useEffect(() => {
    _loadTasks();
  }, []);

  return (
    <SafeAreaView style={styles.Container}>
      <StatusBar barStyle="light-content" backgroundColor={theme.background} />
      <Text style={styles.Title}>TODO List</Text>
      <Input
        placeholder="+ Add a Task"
        onChangeText={_handleTextChange}
        onSubmitEditting={_addTask}
        value={newTask}
      />

      <ScrollView style={styles.List}>
        {Object.values(tasks)
          .reverse()
          .map((item) => (
            <Task
              key={item.id}
              item={item}
              text={item.text}
              deleteTask={_deleteTask}
              toggleTask={_toggleTask}
              updateTask={_updateTask}
              onBlur={_onBlur}
            />
          ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const WIDTH = Dimensions.get("window").width - 40;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: theme.background,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  Title: {
    fontSize: 40,
    fontWeight: "600",
    color: theme.main,
    alignSelf: "flex-start",
    marginVertical: 8,
    marginHorizontal: 20,
  },

  List: {
    flex: 1,
    width: WIDTH,
  },
});

export default App;
