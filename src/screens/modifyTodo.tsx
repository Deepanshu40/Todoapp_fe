// src/components/ModifyTodoModal.tsx
import { useRoute } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  Text,
  Pressable,
  StyleSheet,
  Alert
} from 'react-native';
import { updateTodo } from '../helper/api';


const ModifyTodoModal = ({ navigation }: any) => {
  const [todo, setTodo] = useState(useRoute()?.params?.todo || null);

  useEffect(() => {
    if (!todo) navigation.navigate('Home');
  }, []);

  const handleUpdate = async () => {
    if (todo.title.trim()) {
      await updateTodo(todo.id, todo.title)
        Alert.alert('Success', 'Todo updated successfully!');
      navigation.navigate('Home');
    }
  };


  return (
        <View style={styles.container}>
          <Text style={styles.title}>Modify Todo</Text>
          <TextInput
            value={todo.title}
            onChangeText={(text) => setTodo({...todo, title: text})}
            placeholder="Update title..."
            style={styles.input}
          />
          <Pressable onPress={handleUpdate} style={styles.button}>
            <Text style={styles.buttonText}>Update</Text>
          </Pressable>
          <Pressable style={[styles.button, { backgroundColor: '#aaa' }]}>
            <Text style={styles.buttonText}>Cancel</Text>
          </Pressable>
        </View>
  );
};

export default ModifyTodoModal;

const styles = StyleSheet.create({
  container: {
    padding: 30,
    backgroundColor: '#fff',
    flex: 1,
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 15,
    borderRadius: 4,
    padding: 10,
  },
  button: {
    backgroundColor: 'orange',
    padding: 12,
    borderRadius: 5,
    marginTop: 5
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold'
  }
});
