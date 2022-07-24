import React from 'react';
import {Text, TouchableHighlight, View} from 'react-native';

import {InterestSelectorProps} from './InterestSelector.d';
import styles from './InterestSelector.scss';

const InterestSelector = ({}: InterestSelectorProps) => {
  return (
    <TouchableHighlight style={styles.interestSelector}>
      <View style={styles.interestSelectorInner}>
        <Text style={styles.interestSelectorText}>All Interests</Text>
      </View>
    </TouchableHighlight>
  );
};

export default InterestSelector;
