import React , { Component } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import  DummyHomePage from './screens/Home'
import DummyLoginPage from './screens/Login'
import DummyRegisterPage from './screens/Register'

// initializing the stack container
const Stack = createNativeStackNavigator();

// Main Stack is Here ! 
const ApplicationStack = () => {
  return (
  <NavigationContainer>
    <Stack.Navigator screenOptions={{headerShown : false}}>
      <Stack.Screen
      name = "Home"
      component = {DummyHomePage}
      options = {{title:'Homepage'}}
      />
      <Stack.Screen
      name = "Register"
      component = {DummyRegisterPage}
      options = {{title:'Registerpage'}}
      />
      <Stack.Screen
      name = "Login"
      component = {DummyLoginPage}
      options = {{title:'Loginpage'}}
      />
    </Stack.Navigator>
  </NavigationContainer>
);}

export default ApplicationStack;