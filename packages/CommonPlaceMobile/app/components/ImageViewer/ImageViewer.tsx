import React, {useEffect, useState} from 'react';
import {Dimensions, Image, Text, View} from 'react-native';
import {useImageUrl} from '../../hooks/useImageUrl';

import {ImageViewerProps} from './ImageViewer.d';
import styles from './ImageViewer.scss';

const ImageViewer = ({sourceUrl = ''}: ImageViewerProps) => {
  const {imageUrl} = useImageUrl(sourceUrl as string, {width: 800});
  const [viewerHeight, setViewerHeight] = useState(0);

  useEffect(() => {
    const deviceWidth = Dimensions.get('window').width;

    Image.getSize(
      imageUrl,
      (width, height) => {
        const ratio = deviceWidth / width;
        const proportionalHeight = height * ratio;

        setViewerHeight(proportionalHeight);
      },
      error => {
        console.error(`Couldn't get the image size: ${error.message}`);
      },
    );
  }, [imageUrl]);

  return (
    <View>
      <Image
        style={{width: '100%', height: viewerHeight}}
        source={{uri: imageUrl}}
        resizeMode="contain"
      />
    </View>
  );
};

export default ImageViewer;
