import React, {Suspense} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {CardList} from '../../components/CardList';
import {ButtonTouchable} from '../../components/ButtonTouchable';

import {Input} from '../../components/Input';
import {EmptyProducts} from '../../components/EmptyProducts';
import {HomeProps} from './types';
import {SkeletonLoading} from './components/SkeletonLoading';
import {useHomeScreen} from './hooks/useHomeScreen';

export const HomeScreen = ({navigation}: HomeProps) => {
  const {
    setSearch,
    deferredQuery,
    data,
    loading,
    handleGoToDetail,
    handleGoToForm,
  } = useHomeScreen({navigation});
  return (
    <View style={styles.container}>
      <Input
        placeholder="Buscar..."
        onChange={text => {
          setSearch(text);
        }}
      />
      <Suspense>
        {loading ? (
          <SkeletonLoading />
        ) : (
          <FlatList
            data={
              deferredQuery
                ? data?.filter(({id}) => id.includes(deferredQuery!!))
                : data
            }
            keyExtractor={item => item.id}
            ListEmptyComponent={EmptyProducts}
            renderItem={item => (
              <CardList {...item} handleOnPress={handleGoToDetail} />
            )}
            contentContainerStyle={styles.contentContainerStyle}
          />
        )}
      </Suspense>
      <ButtonTouchable label="Agregar" onPress={handleGoToForm} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 5,
  },
  input: {
    height: 40,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 20,
  },
  contentContainerStyle: {
    flexGrow: 1,
    gap: 5,
  },
});
