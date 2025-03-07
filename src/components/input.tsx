import React from 'react';
import { TextInput, StyleSheet, StyleProp, ViewStyle } from 'react-native';

interface InputProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  keyboardType?: 'default' | 'number-pad' | 'email-address' | 'phone-pad';
  secureTextEntry?: boolean;
  style?: StyleProp<ViewStyle>;
}

const Input = ({ placeholder, value, onChangeText, keyboardType, secureTextEntry, style }: InputProps) => {
  return (
    <TextInput
      style={[styles.input, style]}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      keyboardType={keyboardType}
      secureTextEntry={secureTextEntry}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
});

export default Input;