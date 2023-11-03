import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {colors} from '../theme';

export const Header = () => (
  <View style={styles.container}>
    <Image style={styles.image} source={require('../../assets/banco.png')} />
  </View>
);

export const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: colors.secondary,
  },
  image: {
    width: 'auto',
    height: 30,
    resizeMode: 'contain',
    position: 'relative',
  },
});
