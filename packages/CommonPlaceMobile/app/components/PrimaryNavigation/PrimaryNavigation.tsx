import React from 'react';
import {Text, View} from 'react-native';

import {PrimaryNavigationProps} from './PrimaryNavigation.d';
import styles from './PrimaryNavigation.scss';

const PrimaryNavigation = ({}: PrimaryNavigationProps) => {
  return (
    <View>
      <Text>PrimaryNavigation</Text>
    </View>
  );
};

export default PrimaryNavigation;
