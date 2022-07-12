import React from 'react';
import {Button, Text, View} from 'react-native';
import {useForm} from 'react-hook-form';

import AuthFormStyles from './AuthForm.scss';
import FormTextInput from '../FormTextInput/FormTextInput';

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
    <View>
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
      <Button title="Go" onPress={handleSubmit(onSubmit)} />
    </View>
  );
};

export default AuthForm;
