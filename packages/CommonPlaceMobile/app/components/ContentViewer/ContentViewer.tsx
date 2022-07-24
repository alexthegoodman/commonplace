import React from 'react';
import {Text, View} from 'react-native';
import ImageViewer from '../ImageViewer/ImageViewer';

import {ContentViewerProps} from './ContentViewer.d';
import styles from './ContentViewer.scss';

const ContentViewer = ({
  type = 'image',
  preview = '',
  content = '',
}: ContentViewerProps) => {
  return (
    <View style={styles.contentViewer}>
      {type === 'image' ? <ImageViewer sourceUrl={content} /> : <></>}
      {type === 'video' ? <></> : <></>}
      {type === 'audio' ? <></> : <></>}
      {type === 'text' ? <></> : <></>}
    </View>
  );
};

export default ContentViewer;
