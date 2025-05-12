import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Text } from 'react-native';
import { useMutation } from '@apollo/client';
import { ADD_TODO } from '../helper/graphql.api';

const AddTodoModal = ({ navigation }: any) => {
  const [input, setInput] = useState('');
  const [addTodoMutation, {data}] = useMutation(ADD_TODO)
  const handleAdd = async () => {
    if (input.trim()) {
      await addTodoMutation({variables: {title: input}});
      if (data && data.createTodo.success == false) {
        return data.createTodo.message === "Validation error" ? Alert.alert('Error', data.createTodo.errors.join("\n")) : Alert.alert('Error', data.createTodo.message);
      }
      setInput('');
      Alert.alert('Success', 'Todo added successfully!');
    }
  };

  return (
      <View style={styles.container}>
        <Text style={styles.title}>Add Todo</Text>
          <TextInput
            placeholder="Enter todo"
            value={input}
            onChangeText={setInput}
            style={styles.input}
          />
          <Button title="Add" onPress={handleAdd} />
          <Button title="return to home" onPress={() => navigation.navigate("Home", {tab: 'all'})} color="red" />
        </View>
  );
};

export default AddTodoModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10
  }
});
