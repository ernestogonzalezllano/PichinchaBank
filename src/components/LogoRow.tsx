import {Image, StyleSheet, Text, View} from 'react-native';

export const LogoRow = ({gapName, value}: {gapName: string; value: string}) => {
  return (
    <View style={styles.container}>
      <Text>{gapName}</Text>
      <Image style={styles.image} source={{uri: value}} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  image: {
    height: 100,
    resizeMode: 'center',
    width: '100%',
    marginTop: 5,
  },
});
