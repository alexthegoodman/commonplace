import React from 'react';
import {Button, Pressable, Text, TouchableHighlight, View} from 'react-native';
import {useForm} from 'react-hook-form';

import AuthFormStyles from './AuthForm.scss';
import FormStyles from '../../../styles/forms.scss';
import FormTextInput from '../FormTextInput/FormTextInput';
import CircleButton from '../CircleButton/CircleButton';

const AuthForm = () => {
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
  const onSubmit = data => console.log(data);

  return (
    <View style={FormStyles.form}>
      <FormTextInput
        name="email"
        placeholder="Email"
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
