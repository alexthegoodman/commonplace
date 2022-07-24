import React from 'react';
import {Image, Text, View} from 'react-native';

import {BrandLogoProps} from './BrandLogo.d';
import styles from './BrandLogo.scss';

const BrandLogo = ({}: BrandLogoProps) => {
  return (
    <View style={styles.logoWrapper}>
      <Image
        style={styles.logo}
        source={require('../../../assets/img/logo-192x192.png')}
      />
    </View>
  );
};

export default BrandLogo;
