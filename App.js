import React, { useState, useEffect } from 'react';
import Task from './components/Task';
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

export default function App() {
  const [task, setTask] = useState('');
  const [taskItems, setTaskItems] = useState([]);

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

  const handleAddTask = () => {
    Keyboard.dismiss();
    if (task) {
      setTaskItems([...taskItems, task]);
      setTask('');
    }
  };

  const handleDeleteTask = (index) => {
    const newTaskItems = [...taskItems];
    newTaskItems.splice(index, 1);
    setTaskItems(newTaskItems);
  };

  return (
    <View style={styles.container}>
        <View style={styles.taskWrapper}>
          <Text style={styles.sectionTitle}>Today's tasks</Text>
          <FlatList
            style={styles.taskList} 
            data={taskItems}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <TouchableOpacity onPress={() => handleDeleteTask(index)}>
                <Task text={item} />
              </TouchableOpacity>
            )}
          />
        </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.writeTaskWrapper}
      >
        <TextInput
          style={styles.input}
          placeholder={'Write a task'}
          value={task}
          onChangeText={(text) => setTask(text)}
        />
        <TouchableOpacity onPress={handleAddTask}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

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
