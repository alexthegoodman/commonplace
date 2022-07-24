import React from 'react';
import {Pressable, Text, TouchableOpacity, View} from 'react-native';

import TextStyles from '../../../styles/text.scss';

const TextLink = ({onPress = () => console.info('press'), text = 'Go'}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View>
        <Text style={{...TextStyles.mediumText, ...TextStyles.linkText}}>
          {text}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default TextLink;
