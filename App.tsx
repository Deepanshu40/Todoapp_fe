import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddTodoModal from './src/screens/addTodo';
import ModifyTodoModal from './src/screens/modifyTodo';
import HomeScreen from './src/screens/HomeScreen';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const Stack = createNativeStackNavigator();

const client = new ApolloClient({
  uri: 'https://d0ec-45-115-253-60.ngrok-free.app/graphql',
  cache: new InMemoryCache()
});

const App = () => {
  return (
    <ApolloProvider client={client}>
    <NavigationContainer>
    <Stack.Navigator initialRouteName='Home'>
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="AddToDo" component={AddTodoModal} />
    <Stack.Screen name="ModifyToDo" component={ModifyTodoModal} />
    </Stack.Navigator>      
    </NavigationContainer>

    </ApolloProvider>
  );
};


export default App;
