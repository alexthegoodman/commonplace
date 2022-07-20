import React from 'react';
import {Text, TouchableHighlight, View} from 'react-native';

import {PrimaryNavigationProps} from './PrimaryNavigation.d';
import styles from './PrimaryNavigation.scss';

const PrimaryNavigation = ({}: PrimaryNavigationProps) => {
  return (
    <View>
      <TouchableHighlight style={styles.primaryNavOption}>
        <Text>U</Text>
      </TouchableHighlight>
      <TouchableHighlight style={styles.navOption}>
        <Text>M</Text>
      </TouchableHighlight>
      <TouchableHighlight style={styles.navOption}>
        <Text>P</Text>
      </TouchableHighlight>
    </View>
  );
};

export default PrimaryNavigation;
