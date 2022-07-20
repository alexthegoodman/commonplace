import React from 'react';
import {Text, View} from 'react-native';

import styles from './InlineHeader.scss';

const InlineHeader = ({
  title = '',
  leftComponent = null,
  rightComponent = null,
  centerComponent = null,
}) => {
  return (
    <View style={styles.inlineHeader}>
      {leftComponent ? <View>{leftComponent}</View> : <></>}

      {centerComponent ? (
        <View></View>
      ) : (
        <Text style={styles.headerTitle}>{title}</Text>
      )}

      {rightComponent ? <View>{rightComponent}</View> : <></>}
    </View>
  );
};

export default InlineHeader;
