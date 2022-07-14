import React, {useState} from 'react';
import {Button, Pressable, Text, TouchableHighlight, View} from 'react-native';
import {useForm} from 'react-hook-form';
import EncryptedStorage from 'react-native-encrypted-storage';

import AuthFormStyles from './AuthForm.scss';
import FormStyles from '../../../styles/forms.scss';
import FormTextInput from '../FormTextInput/FormTextInput';
import CircleButton from '../CircleButton/CircleButton';
import {ApolloClient, gql} from '@apollo/client';
import Helpers from '../../utilities/Helpers';
import FormMessage from '../FormMessage/FormMessage';

const AuthForm = ({
  type = 'sign-in',
  client = null,
}: {
  type: string;
  client: ApolloClient<any>;
}) => {
  const helpers = new Helpers();

  const [formErrorMessage, setFormErrorMessage] = useState('');

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async data => {
    console.info('onSubmit', type, data);

    try {
      const authorizationHeader = helpers.createAuthHeader(
        `${data.email}:${data.password}`,
      );

      console.info('authorizationHeader', authorizationHeader);

      const userIdData = await client.query({
        query: gql`
          query AuthenticateUser {
            authenticate
          }
        `,
        context: {
          headers: {
            Authorization: authorizationHeader,
          },
        },
      });

      console.info('token', userIdData.data.authenticate);

      await EncryptedStorage.setItem(
        'coUserToken',
        userIdData.data.authenticate,
      );

      // set via secure storage
      // navigate to queue
      setFormErrorMessage('');
    } catch (error: any) {
      // console.error('error', error);
      const errorMessage = error?.graphQLErrors[0].message;
      setFormErrorMessage(errorMessage);
    }
  };

  return (
    <View style={FormStyles.form}>
      <FormMessage type="error" message={formErrorMessage} />
      <FormTextInput
        name="email"
        placeholder="Email"
        autoComplete="email"
        control={control}
        errors={errors}
      />
      <FormTextInput
        name="password"
        placeholder="Password"
        secureTextEntry={true}
        control={control}
        errors={errors}
      />
      <CircleButton onPress={handleSubmit(onSubmit)} />
    </View>
  );
};

export default AuthForm;
