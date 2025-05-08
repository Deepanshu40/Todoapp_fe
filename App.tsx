import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddTodoModal from './src/screens/addTodo';
import ModifyTodoModal from './src/screens/modifyTodo';
import HomeScreen from './src/screens/HomeScreen';

const Stack = createNativeStackNavigator();


const App = () => {

  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName='Home'>
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="AddToDo" component={AddTodoModal} />
    <Stack.Screen name="ModifyToDo" component={ModifyTodoModal} />
    </Stack.Navigator>      
    </NavigationContainer>
  );
};


export default App;
