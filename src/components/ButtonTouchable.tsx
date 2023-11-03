import React from 'react';
import {
  GestureResponderEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {colors} from '../theme';
import {Spinner} from './Spinner';

export const ButtonTouchable = ({
  label,
  type = 'primary',
  onPress,
  loading,
  disabled,
}: {
  label: string;
  type?: keyof typeof buttons_theme;
  onPress?: (event: GestureResponderEvent) => void;
  loading?: boolean;
  disabled?: boolean;
}) => {
  let buttonType = disabled || loading ? 'disabled' : type;
  return (
    <TouchableOpacity
      disabled={disabled}
      style={{
        ...styles.container,
        ...buttons_theme[buttonType],
      }}
      onPress={onPress}>
      {loading ? (
        <Spinner color={spinner_theme[buttonType]?.color} />
      ) : (
        <Text style={{...styles.text, ...buttons_theme[buttonType]}}>
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
  },
  text: {
    fontWeight: 'bold',
  },
});

const buttons_theme = StyleSheet.create({
  danger: {
    backgroundColor: colors.danger,
    color: colors.white,
  },
  primary: {
    backgroundColor: colors.primary,
  },
  secondary: {
    backgroundColor: colors.secondary,
  },
  disabled: {
    backgroundColor: colors.secondary,
    opacity: 0.5,
  },
});

const spinner_theme = StyleSheet.create({
  primary: {color: colors.black},
  secondary: {color: colors.primary},
  danger: {color: colors.white},
  disabled: {color: colors.black},
});
