import React, {type PropsWithChildren} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';

import Appstyles from './App.scss';
import SignIn from './app/scenes/SignIn/SignIn';
import SignUp from './app/scenes/SignUp/SignUp';

const client = new ApolloClient({
  uri: 'http://192.168.0.152:4000/graphql',
  cache: new InMemoryCache(),
});

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="sign-in" component={SignIn} />
          <Stack.Screen name="sign-up" component={SignUp} />
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
};

export default App;
