import React from 'react';
import {Image, Text, TouchableHighlight, View} from 'react-native';
import moment from 'moment';

import {ContentInformationProps} from './ContentInformation.d';
import styles from './ContentInformation.scss';
import {useImageUrl} from '../../hooks/useImageUrl';

const ContentInformation = ({post = null}: ContentInformationProps) => {
  const displayDate = moment(post?.createdAt).format('MMMM D, YYYY');

  const {imageUrl: profileImageUrl} = useImageUrl(post?.creator?.profileImage, {
    fit: 'cover',
    width: 100,
    height: 100,
  });

  return (
    <View>
      <View>
        <Text>{post?.title}</Text>
      </View>
      <TouchableHighlight>
        <View>
          <Image
            style={{height: 50, width: 50}}
            source={{uri: profileImageUrl}}
          />
          <View>
            <Text>{post?.creator?.chosenUsername}</Text>
            <Text>{post?.creator?.posts?.length} Creations</Text>
          </View>
        </View>
      </TouchableHighlight>
      <View>
        <Text>{post?.description}</Text>
        <Text>{post?.contentType}</Text>
        <Text>Uploaded on {displayDate}</Text>
      </View>
    </View>
  );
};

export default ContentInformation;
