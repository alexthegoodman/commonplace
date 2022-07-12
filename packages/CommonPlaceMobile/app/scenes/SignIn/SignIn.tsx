import React, {type PropsWithChildren} from 'react';
import {
  KeyboardAvoidingView,
  SafeAreaView,
  StatusBar,
  Text,
} from 'react-native';
import AuthForm from '../../components/AuthForm/AuthForm';
import InlineHeader from '../../components/InlineHeader/InlineHeader';

const SignIn = () => {
  return (
    <SafeAreaView>
      <StatusBar barStyle={'light-content'} />
      <KeyboardAvoidingView>
        <InlineHeader title="Sign In" />
        <AuthForm />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignIn;
