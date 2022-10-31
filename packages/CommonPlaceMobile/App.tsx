import React, {
  useContext,
  useEffect,
  useReducer,
  useState,
  type PropsWithChildren,
} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  ApolloLink,
} from '@apollo/client';
import EncryptedStorage from 'react-native-encrypted-storage';

import Appstyles from './App.scss';

import SignIn from './app/scenes/SignIn/SignIn';
import SignUp from './app/scenes/SignUp/SignUp';
import Queue from './app/scenes/Queue/Queue';
import {
  AppContext,
  AppContextReducer,
  AppContextState,
} from './app/context/AppContext';
import Settings from './app/scenes/Settings/Settings';

const httpLink = new HttpLink({uri: 'http://192.168.0.106:4000/graphql'});

const authLink = new ApolloLink(async (operation, forward) => {
  const token = await EncryptedStorage.getItem('coUserToken');

  if (token) {
    operation.setContext({
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return forward(operation);
});

const client = new ApolloClient({
  // uri: 'http://192.168.0.152:4000/graphql',
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const Stack = createNativeStackNavigator();

const AppInner = () => {
  const [state, dispatch] = useReducer(AppContextReducer, AppContextState);
  // const {state, dispatch} = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(true);
  const isSignedIn = state.token && state.token !== '';

  console.info('App render', state);

  useEffect(() => {
    console.info('App effect', isSignedIn);
    const checkStorage = async () => {
      const coUserToken = await EncryptedStorage.getItem('coUserToken');
      dispatch({type: 'token', payload: coUserToken});
      setIsLoading(false);
    };

    checkStorage();
  }, []);

  if (isLoading) {
    // TODO: add splash screen
    return <></>;
  }

  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          {isSignedIn ? <Stack.Screen name="queue" component={Queue} /> : <></>}
          <>
            <Stack.Screen name="sign-in" component={SignIn} />
            <Stack.Screen name="sign-up" component={SignUp} />
          </>
          {!isSignedIn ? (
            <Stack.Screen name="queue" component={Queue} />
          ) : (
            <></>
          )}
          <Stack.Group navigationKey={isSignedIn ? 'user' : 'guest'}>
            <Stack.Screen name="settings" component={Settings} />
          </Stack.Group>
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
};

const App = () => {
  const [state, dispatch] = useReducer(AppContextReducer, AppContextState);

  return (
    <AppContext.Provider value={{state, dispatch}}>
      <AppInner />
    </AppContext.Provider>
  );
};

export default App;
