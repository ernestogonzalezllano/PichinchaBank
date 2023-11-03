import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {colors} from '../theme';

interface Props {
  errorLabel?: string;
  label?: string;
  placeholder?: string;
  onChange?: ((text: string) => void) | undefined;
  value?: string;
  disabled?: boolean;
}

export const Input = ({
  errorLabel,
  label,
  placeholder,
  onChange,
  value,
  disabled,
}: Props) => {
  let type: keyof typeof input_theme = 'secondary';
  if (errorLabel) {
    type = 'danger';
  }
  if (disabled) {
    type = 'disabled';
  }
  return (
    <View>
      {label && <Text style={{...styles.label}}>{label}</Text>}
      <TextInput
        placeholder={placeholder}
        onChangeText={onChange}
        style={{...styles.input, ...input_theme[type]}}
        value={value}
        editable={!disabled}
      />
      {errorLabel && (
        <Text style={{...styles.textError, ...error_text[type]}}>
          {errorLabel}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  label: {fontWeight: 'bold', marginVertical: 5},
  input: {
    height: 40,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
  },
  textError: {
    fontWeight: 'bold',
  },
});

const input_theme = StyleSheet.create({
  danger: {
    borderColor: colors.danger,
  },
  primary: {
    backgroundColor: colors.primary,
  },
  secondary: {
    borderColor: colors.secondary,
  },
  disabled: {
    backgroundColor: colors.secondary,
    borderColor: colors.secondary,
  },
});

const error_text = StyleSheet.create({
  danger: {
    color: colors.danger,
  },
  primary: {
    backgroundColor: colors.primary,
  },
  secondary: {
    borderColor: colors.secondary,
  },
  disabled: {},
});
