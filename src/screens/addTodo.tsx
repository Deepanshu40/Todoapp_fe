import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Text } from 'react-native';
import { addTodo } from '../helper/api';

const AddTodoModal = ({ navigation }: any) => {
  const [input, setInput] = useState('');

  const handleAdd = async () => {
    if (input.trim()) {
      await addTodo(input.trim());
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
