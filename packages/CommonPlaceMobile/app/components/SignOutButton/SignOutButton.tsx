import React, {useReducer} from 'react';
import {Text, TouchableHighlight, View} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import {AppContextReducer, AppContextState} from '../../context/AppContext';

import {SignOutButtonProps} from './SignOutButton.d';
import styles from './SignOutButton.scss';

const SignOutButton = ({navigation}: SignOutButtonProps) => {
  const [state, dispatch] = useReducer(AppContextReducer, AppContextState);

  console.info('SIgnout render', state);

  const signOut = async () => {
    await EncryptedStorage.removeItem('coUserToken');

    dispatch({type: 'token', payload: ''});

    navigation.navigate('sign-in');
  };

  return (
    <View>
      <TouchableHighlight onPress={signOut}>
        <View>
          <Text>Sign Out</Text>
        </View>
      </TouchableHighlight>
    </View>
  );
};

export default SignOutButton;
