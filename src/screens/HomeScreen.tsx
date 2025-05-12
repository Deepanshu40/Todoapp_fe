import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {useQuery, useMutation} from '@apollo/client';
import {GET_TODOS, DELETE_TODO} from '../helper/graphql.api';

const HomeScreen = () => {
  const [activeTab, setActiveTab] = useState('all');
  const navigation = useNavigation();
  
  const {data, loading, error, refetch} = useQuery(GET_TODOS);
  const [deleteTodoMutation, {data: deleteData}] = useMutation(DELETE_TODO);

  const todos = data?.getTodos?.data || [];
  if (data && data.getTodos.success == false) {
    return data.getTodos.message === "Validation error" ? Alert.alert('Error', data.getTodos.errors.join("\n")) : Alert.alert('Error', data.getTodos.message);  
  }

  useFocusEffect(
    React.useCallback(() => {
      setActiveTab('all');
      refetch();
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
            await deleteTodoMutation({variables: {id}});
            if (deleteData && deleteData.deleteTodo.success == false) {
              return deleteData.deleteTodo.message === "Validation error" ? Alert.alert('Error', deleteData.deleteTodo.errors.join("\n")) : Alert.alert('Error', deleteData.deleteTodo.message);
            }
            refetch();
          } catch (err) {
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
