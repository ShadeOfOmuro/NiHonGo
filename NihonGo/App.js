import React , {Component} from 'react'
import {NavigationContainer} from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {LoginPage} from "./screens/Login";
import {RegisterPage} from "./screens/Register";
import {HomePage} from './screens/Home';
import {SettingPage} from './screens/setting';
import {StudyPage} from './screens/study';
import {ChapterListPage} from './screens/chapter_list';
import {ChapterPage} from './screens/chapter';
import {LeaderBoardPage} from './screens/leaderboard';
import {QuizPage} from './screens/quiz'
import { QuizGameResult } from './screens/game_result';
import { GamePage } from './screens/game';
import { GameSelect } from './screens/game_select';
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
          component={HomePage}
          options={{}}/>
          <Stack.Screen
          name="Setting"
          component={SettingPage}
          options={{}}/>
          <Stack.Screen
          name="Study"
          component={StudyPage}
          options={{}} />
          <Stack.Screen
          name="Study_List"
          component = {ChapterListPage}
          options={{}} />
          <Stack.Screen
          name="Chapter"
          component={ChapterPage}
          options={{}} />
          <Stack.Screen
          name="Leaderboard"
          component={LeaderBoardPage}
          options={{}} />
          <Stack.Screen
          name="Quiz"
          component={QuizPage}
          options={{}}/>
          <Stack.Screen
          name="QuizGameResult"
          component={QuizGameResult}
          options={{}}/>
          <Stack.Screen
          name="GamePage"
          component={GamePage}
          options={{}}/>
          <Stack.Screen
          name="GameSelect"
          component={GameSelect}
          options={{}}/>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
export default Application;