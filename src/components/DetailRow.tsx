import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export const DetailRow = ({
  gapName,
  value,
}: {
  gapName: string;
  value: string;
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.textKey}>{gapName}</Text>
      <Text style={styles.textValue}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  textKey: {},
  textValue: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'right',
  },
});
