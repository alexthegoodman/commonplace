import React, {type PropsWithChildren} from 'react';
import {
  KeyboardAvoidingView,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AuthForm from '../../components/AuthForm/AuthForm';
import InlineHeader from '../../components/InlineHeader/InlineHeader';

import TextStyles from '../../../styles/text.scss';
import TextLink from '../../components/TextLink/TextLink';

const SignIn = ({navigation}) => {
  return (
    <SafeAreaView>
      <StatusBar barStyle={'light-content'} />
      <KeyboardAvoidingView>
        <InlineHeader title="Sign In" />
        <AuthForm type="sign-in" />
        <View style={{...TextStyles.inlineText, marginTop: 25}}>
          <Text style={TextStyles.mediumText}>Or you may </Text>
          <TextLink
            onPress={() => navigation.navigate('sign-up')}
            text="Sign Up"
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignIn;
