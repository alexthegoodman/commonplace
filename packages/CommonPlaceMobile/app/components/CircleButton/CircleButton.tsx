import React from 'react';
import {Pressable, Text, TouchableHighlight, View} from 'react-native';

import CircleButtonStyles from './CircleButton.scss';

const CircleButton = ({onPress = () => console.info('press'), text = 'Go'}) => {
  return (
    <TouchableHighlight
      style={CircleButtonStyles.circleButton}
      onPress={onPress}>
      <View>
        <Text style={CircleButtonStyles.circleButtonText}>{text}</Text>
      </View>
    </TouchableHighlight>
  );
};

export default CircleButton;
