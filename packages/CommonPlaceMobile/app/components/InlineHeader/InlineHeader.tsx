import React from 'react';
import {Text, View} from 'react-native';

import styles from './InlineHeader.scss';

const InlineHeader = ({
  title = '',
  leftComponent = <></>,
  rightComponent = <></>,
  centerComponent = <></>,
}) => {
  return (
    <View style={styles.inlineHeader}>
      {leftComponent ? <View>{leftComponent}</View> : <></>}

      {centerComponent ? (
        <View>{centerComponent}</View>
      ) : (
        <Text style={styles.headerTitle}>{title}</Text>
      )}

      {rightComponent ? <View>{rightComponent}</View> : <></>}
    </View>
  );
};

export default InlineHeader;
