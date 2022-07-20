import React, {type PropsWithChildren} from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import InlineHeader from '../../components/InlineHeader/InlineHeader';

const Settings = ({navigation}) => {
  return (
    <SafeAreaView>
      <StatusBar barStyle={'light-content'} />
      <InlineHeader title="Settings" />
    </SafeAreaView>
  );
};

export default Settings;
