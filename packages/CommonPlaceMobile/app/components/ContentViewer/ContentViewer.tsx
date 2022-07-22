import React from 'react';
import {Text, View} from 'react-native';

import {ContentViewerProps} from './ContentViewer.d';
import styles from './ContentViewer.scss';

const ContentViewer = ({
  type = 'image',
  preview = '',
  content = '',
}: ContentViewerProps) => {
  return (
    <View>
      <Text>{content}</Text>
    </View>
  );
};

export default ContentViewer;
