import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ModifyTodoModal from '../screens/modifyTodo';
import { getTodos, addTodo, updateTodo, deleteTodo } from '../helper/api';
import { useFocusEffect } from '@react-navigation/native';


const HomeScreen = ({navigation} : any) => {
  const [activeTab, setActiveTab] = useState('all');
  const [todos, setTodos] = useState<{ id: string; title: string }[]>([]);
  const [loading, setLoading] = useState(true);


  const fetchTodos = async () => {
    try {
      setLoading(true);
      const data = await getTodos();
      setTodos(data);
    } catch (err) {
      console.error('Error fetching todos:', err);
      Alert.alert('Error', 'Failed to fetch todos.');
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchTodos();
    }, [])
  );


  const handleDelete = async (id: string) => {
    Alert.alert('Delete', 'Are you sure?', [
      {text: 'Cancel'},
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            await deleteTodo(id);
            await fetchTodos();
          } catch (err) {
            console.error('Delete error:', err);
            Alert.alert('Error', 'Could not delete todo.');
          }
        },
      },
    ]);
  };


  return (
    <View style={styles.container}>
      <View style={styles.buttonGroup}>
        {['all', 'add'].map(tab => (
          <Pressable
            key={tab}
            style={[styles.button, activeTab === tab && styles.activeButton]}
            onPress={() => {
              setActiveTab(tab);
              if (tab === 'add') navigation.navigate('AddToDo');
            }}>
            <Text style={activeTab === tab && styles.activeText}>
              {tab.charAt(0).toUpperCase() + tab.slice(1)} Todo
            </Text>
          </Pressable>
        ))}
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="green" style={{marginTop: 40}} />
      ) : (
        <FlatList
          data={todos}
          keyExtractor={item => item.id}
          contentContainerStyle={{marginTop: 20}}
          renderItem={({item}) => (
            <View style={styles.todoItem}>
              <Text style={styles.todoText}>{item.title}</Text>
                <View style={styles.iconGroup}>
                <Pressable onPress={() => navigation.navigate('ModifyToDo', {todo: item})}>
                  <Ionicons name="create-outline" size={22} color="orange" />
                </Pressable>
                <Pressable onPress={() => handleDelete(item.id)}>
                  <Ionicons name="trash-outline" size={22} color="red" />
                </Pressable>
              </View>
            </View>
          )}
        />
      )}
    </View>

  );
};


export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    padding: 30,
    backgroundColor: '#fff',
    flex: 1,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
  },
  button: {
    padding: 10,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#ccc',
  },
  activeButton: {
    backgroundColor: 'green',
  },
  activeText: {
    color: 'white',
    fontWeight: 'bold',
  },
  todoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f2f2f2',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  todoText: {
    fontSize: 16,
  },
  iconGroup: {
    flexDirection: 'row',
    gap: 15,
  },
});
