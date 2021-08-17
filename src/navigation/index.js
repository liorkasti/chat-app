import React, { useState, useEffect, useReducer, useMemo } from 'react';
import { YellowBox, LogBox } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
// import auth from '@react-native-firebase/auth';

import RootStackScreen from './RootStackScreen';
import { ChetRoom, SplashScreen } from '../screens';
import Background from '../components/Background'
import Orientation from 'react-native-orientation-locker';

const Stack = createStackNavigator();
// const currentUser = auth().currentUser;

export default AppStack = () => {

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    onAuthStateChanged = (user) => {
      wait(500).then(() => (
        currentUser ? setLoaded(true) : setLoaded(false)
      ));
    }
    // bootstrap()
    setTimeout(() => { Orientation.lockToPortrait(); });
    return onOpenIndex();
  }, []);

  const onOpenIndex = () => {
    // console.disableYellowBox = true;
    // YellowBox.ignoreWarnings(['Non-serializable values were found in the navigation state',
    //   'Warning: Async Storage has been extracted from react-native core']);
    LogBox.ignoreLogs(['Setting a timer for a long period of time']);
  }

  const username = "";
  if (username) {
    return (
      <Background>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', Background:'#01ab9d' }}>
          <ActivityIndicator size="large" />
        </View>
      </ Background>
    );
  }
  return (
    <NavigationContainer>
      {loaded ?
        <Stack.Navigator headerMode='none'>
          <Stack.Screen name="ChetRoom" component={ChetRoom} />
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
        </Stack.Navigator>
        :
        <RootStackScreen />
      }
    </NavigationContainer>
  );
}

function wait(timeout) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}
async function bootstrap() {
  await database().settings({
    persistence: false, // disable offline persistence
  });
}