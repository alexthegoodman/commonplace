import React from 'react';
import {Pressable, Text, View} from 'react-native';

import CircleButtonStyles from './CircleButton.scss';

const CircleButton = ({onPress = () => console.info('press'), text = 'Go'}) => {
  return (
    <Pressable style={CircleButtonStyles.circleButton} onPress={onPress}>
      <Text style={CircleButtonStyles.circleButtonText}>{text}</Text>
    </Pressable>
  );
};

export default CircleButton;
