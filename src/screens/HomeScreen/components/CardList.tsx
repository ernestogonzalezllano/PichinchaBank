import React from 'react';
import {
  Image,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Product} from '../../../types/api';
import {colors} from '../../../theme';

interface CardListProps extends ListRenderItemInfo<Product> {
  handleOnPress: (product: Product) => void;
}

export const CardList = ({handleOnPress, item: product}: CardListProps) => {
  let textName = product.name;
  if (textName.length > 40) {
    textName = textName.substring(0, 40) + '...';
  }
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => handleOnPress(product)}>
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{textName}</Text>
        <Text>ID: {product.id}</Text>
      </View>
      <View style={styles.iconContainer}>
        <Image
          style={styles.icon}
          source={require('../../../../assets/right.png')}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    borderColor: colors.secondary,
  },
  infoContainer: {flex: 1},
  name: {
    fontWeight: 'bold',
  },
  iconContainer: {
    width: 20,
    justifyContent: 'center',
  },
  icon: {
    width: 'auto',
    height: 30,
    resizeMode: 'contain',
    position: 'relative',
  },
});
