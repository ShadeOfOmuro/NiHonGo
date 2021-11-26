import React , {Component} from 'react'
import {NavigationContainer} from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginPage from "./screens/Login";
import RegisterPage from "./screens/Register";
import DummyHomePage from './screens/Home';

const Stack = createNativeStackNavigator();
class Application extends Component {
  render() {
    return(
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}} >
          <Stack.Screen
          name="Login"
          component={LoginPage}
          options={{title : 'welcome'}}
          />
          <Stack.Screen
          name="Register"
          component={RegisterPage}
          options={{}}
          />
          <Stack.Screen
          name="Homepage"
          component={DummyHomePage}
          options={{}}/>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
export default Application;