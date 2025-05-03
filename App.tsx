import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AddTodoModal from './src/components/addTodo';
import ModifyTodoModal from './src/components/modifyTodo';
import { getTodos, addTodo, updateTodo, deleteTodo } from './src/helper/api';

const App = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [todos, setTodos] = useState<{ id: string; title: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showModifyModal, setShowModifyModal] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<{ id: string; title: string } | null>(null);

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

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleAddTodo = async (title: string) => {
    try {
      await addTodo(title);
      await fetchTodos();
      setActiveTab('all');
    } catch (err) {
      console.error('Add error:', err);
      Alert.alert('Error', 'Could not add todo.');
    }
  };

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

  const handleModify = (id: string) => {
    const todo = todos.find(t => t.id === id);
    if (todo) {
      setSelectedTodo(todo);
      setShowModifyModal(true);
    }
  };

  const handleUpdate = async (id: string, updatedTitle: string) => {
    try {
      await updateTodo(id, updatedTitle);
      await fetchTodos();
      setActiveTab('all');
    } catch (err) {
      console.error('Update error:', err);
      Alert.alert('Error', 'Could not update todo.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Dashboard</Text>

      <View style={styles.buttonGroup}>
        {['all', 'add', 'modify'].map(tab => (
          <Pressable
            key={tab}
            style={[styles.button, activeTab === tab && styles.activeButton]}
            onPress={() => {
              setActiveTab(tab);
              if (tab === 'add') setShowModal(true);
            }}>
            <Text style={activeTab === tab && styles.activeText}>
              {tab.charAt(0).toUpperCase() + tab.slice(1)} Todo
            </Text>
          </Pressable>
        ))}
      </View>

      <AddTodoModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        onAdd={handleAddTodo}
      />
      <ModifyTodoModal
        visible={showModifyModal}
        todo={selectedTodo}
        onClose={() => setShowModifyModal(false)}
        onUpdate={handleUpdate}
      />

      {loading ? (
        <ActivityIndicator size="large" color="green" style={{marginTop: 40}} />
      ) : (
        todos.length === 0 ? (
          <Text style={{marginTop: 20, fontSize: 18, textAlign: 'center'}}>
            No todos available.
          </Text>
        ) : 
        <FlatList
          data={todos}
          keyExtractor={item => item.id}
          contentContainerStyle={{marginTop: 20}}
          renderItem={({item}) => (
            <View style={styles.todoItem}>
              <Text style={styles.todoText}>{item.title}</Text>
              {activeTab == 'modify' && (
                <View style={styles.iconGroup}>
                <Pressable onPress={() => handleModify(item.id)}>
                  <Ionicons name="create-outline" size={22} color="orange" />
                </Pressable>
                <Pressable onPress={() => handleDelete(item.id)}>
                  <Ionicons name="trash-outline" size={22} color="red" />
                </Pressable>
              </View>
              )}
            </View>
          )}
        />
      )}
    </View>
  );
};


export default App;

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
