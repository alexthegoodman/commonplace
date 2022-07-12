import React from 'react';
import {Text, View} from 'react-native';

import InlineHeaderStyles from './InlineHeader.scss';

const InlineHeader = ({title = ''}) => {
  return (
    <View style={InlineHeaderStyles.inlineHeader}>
      <Text style={InlineHeaderStyles.headerTitle}>{title}</Text>
    </View>
  );
};

export default InlineHeader;
