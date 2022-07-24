import React from 'react';
import {Text, TouchableHighlight, View} from 'react-native';

import {PrimaryNavigationProps} from './PrimaryNavigation.d';
import styles from './PrimaryNavigation.scss';

import Plus from '../../../assets/svg/plus.svg';
import Messages from '../../../assets/svg/messages.svg';
import UserOutline from '../../../assets/svg/user-outline.svg';

const PrimaryNavigation = ({}: PrimaryNavigationProps) => {
  return (
    <View>
      <TouchableHighlight style={styles.primaryNavOption}>
        <Text style={styles.navOptionText}>
          <Plus width="25" height="25" style={{color: 'white'}} />
        </Text>
      </TouchableHighlight>
      <TouchableHighlight style={styles.navOption}>
        <Text style={styles.navOptionText}>
          <Messages width="25" height="25" style={{color: 'grey'}} />
        </Text>
      </TouchableHighlight>
      <TouchableHighlight style={styles.navOption}>
        <Text style={styles.navOptionText}>
          <UserOutline width="25" height="25" style={{color: 'grey'}} />
        </Text>
      </TouchableHighlight>
    </View>
  );
};

export default PrimaryNavigation;
