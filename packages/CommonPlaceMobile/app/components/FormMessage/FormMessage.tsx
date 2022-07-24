import React from 'react';
import {Pressable, Text, TouchableOpacity, View} from 'react-native';

import FormMessageStyles from './FormMessage.scss';

const FormMessage = ({type = 'error', message = ''}) => {
  return (
    <View>
      <Text style={FormMessageStyles.message}>{message}</Text>
    </View>
  );
};

export default FormMessage;
