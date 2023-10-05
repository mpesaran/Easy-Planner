import React, { useState, useEffect } from 'react';
import Task from './components/Task'; //Import Task component
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
  FlatList
} from 'react-native';
//The AsyncStorage is the package we use for storing and retrieving data persistently.
import AsyncStorage from '@react-native-async-storage/async-storage'; 

// Define the main component
export default function App() {
  // Define states to manage tasks and the input field
  const [task, setTask] = useState('');
  const [taskItems, setTaskItems] = useState([]);

  /* I used a useEffect hook to load tasks from AsyncStorage when the component mounts. 
  Inside the loadTasks function, I used AsyncStorage.getItem('tasks') to retrieve the saved tasks as a string.
  then checked if there are saved tasks, parse them into an array with JSON.parse, and set the taskItems state 
  with the retrieved tasks.*/
  useEffect(() => {
    async function loadTasks() {
      try {
        const savedTasks = await AsyncStorage.getItem('tasks');
        if (savedTasks) {
          setTaskItems(JSON.parse(savedTasks));
        }
      } catch (error) {
        console.error('Error loading tasks:', error);
      }
    }

    loadTasks();
  }, []);

  /*I used another useEffect hook to save tasks to AsyncStorage whenever taskItems changes.
  Inside the saveTasks function, I used AsyncStorage.setItem('tasks', JSON.stringify(taskItems)) to save the 
  taskItems array as a JSON string in AsyncStorage. */
  useEffect(() => {
    async function saveTasks() {
      try {
        await AsyncStorage.setItem('tasks', JSON.stringify(taskItems));
      } catch (error) {
        console.error('Error saving tasks:', error);
      }
    }

    saveTasks();
  }, [taskItems]);


  /* The handleAddTask function is responsible for adding a new task.
  It dismisses the keyboard using Keyboard.dismiss().
  If the task input is not empty, it adds the task to the taskItems array and clears the input field.*/
  const handleAddTask = () => {
    Keyboard.dismiss();
    if (task) {
      setTaskItems([...taskItems, task]);
      setTask('');
    }
  };

  /*The handleDeleteTask function is responsible for deleting a task.
  It creates a new array newTaskItems by cloning taskItems.
  It removes the task at the specified index using splice,
  then sets taskItems to the new array, effectively removing the task. */
  const handleDeleteTask = (index) => {
    const newTaskItems = [...taskItems];
    newTaskItems.splice(index, 1);
    setTaskItems(newTaskItems);
  };

  // Return the main app interface
  return (
    <View style={styles.container}>
      {/* Task List Section */}
        <View style={styles.taskWrapper}>
          <Text style={styles.sectionTitle}>Today's tasks</Text>

          {/*Instead of mapping over taskItems, I used a FlatList to render the list of tasks.
            data={taskItems} specifies the data source for the list.
            keyExtractor defines a unique key for each item.
            renderItem specifies how each item is rendered, including the Task component and the onPress event to delete a task. */}
          <FlatList
            style={styles.taskList} 
            data={taskItems}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <TouchableOpacity onPress={() => handleDeleteTask(index)}>
                {/*The text prop is passed to the Task component to display the task description. */}
                <Task text={item} />
              </TouchableOpacity>
            )}
          />
        </View>

      {/* Task Input Section */}     
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.writeTaskWrapper}
      >
        {/* Input field for adding tasks */}
        <TextInput
          style={styles.input}
          placeholder={'Write a task'}
          value={task}
          onChangeText={(text) => setTask(text)}
        />
        {/* Button to add a task */}
        <TouchableOpacity onPress={handleAddTask}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

// Define styles for the components
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  taskWrapper: {
    paddingTop: 80,
    paddingHorizontal : 20,
  },
  sectionTitle : {
    fontSize : 24,
    fontWeight : 'bold',
    marginBottom:10,
  },
  items : {
      marginTop:35,
  }, 
  addText :{
    fontSize: 25,
    color : '#067e2e'
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'

  }, addWrapper: {
    width : 60,
    height: 60,
    borderRadius: 60,
    backgroundColor: '#fff',
    borderColor: '#c0c0c0',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  input: {
    paddingVertical: 15,
    width: '75%',
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    borderRadius: 60,
    borderColor: '#c0c0c0',
    borderWidth: 1,
    
  },
  taskList :{
      height: '75%'
  }
});
