import React, {type PropsWithChildren} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Appstyles from './App.scss';
import SignIn from './app/scenes/SignIn/SignIn';
import SignUp from './app/scenes/SignUp/SignUp';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="sign-in" component={SignIn} />
        <Stack.Screen name="sign-up" component={SignUp} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
