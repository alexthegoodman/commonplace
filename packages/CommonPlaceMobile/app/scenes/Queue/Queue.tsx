import React, {type PropsWithChildren} from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import InlineHeader from '../../components/InlineHeader/InlineHeader';

const Queue = ({navigation}) => {
  return (
    <SafeAreaView>
      <StatusBar barStyle={'light-content'} />
      <InlineHeader title="Queue" />
    </SafeAreaView>
  );
};

export default Queue;
