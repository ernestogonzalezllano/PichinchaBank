import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export const EmptyProducts = () => (
  <View style={styles.container}>
    <Text>SIN RESULTADOS</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
