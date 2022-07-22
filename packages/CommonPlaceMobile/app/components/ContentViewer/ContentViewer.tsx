import React from 'react';
import {Text, View} from 'react-native';

import {ContentViewerProps} from './ContentViewer.d';
import styles from './ContentViewer.scss';

const ContentViewer = ({}: ContentViewerProps) => {
  return (
    <View>
      <Text>ContentViewer</Text>
    </View>
  );
};

export default ContentViewer;
