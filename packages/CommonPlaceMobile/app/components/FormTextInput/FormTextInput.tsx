import React from 'react';
import {Text, TextInput, View} from 'react-native';
import {Controller} from 'react-hook-form';

import FormTextInputStyles from './FormTextInput.scss';

const FormTextInput = ({
  name = '',
  control = undefined,
  errors = null,
  ...props
}) => {
  return (
    <>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <View style={FormTextInputStyles.textInputWrapper}>
            <TextInput
              style={FormTextInputStyles.textInput}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              {...props}
            />
          </View>
        )}
        name={name}
      />
      {/* {errors[name] && <Text>This is required.</Text>} */}
    </>
  );
};

export default FormTextInput;
