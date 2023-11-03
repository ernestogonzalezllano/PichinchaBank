import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {DetailRow} from '../../components/DetailRow';
import {LogoRow} from '../../components/LogoRow';
import {ButtonTouchable} from '../../components/ButtonTouchable';
import {GAPS} from '../../constants';
import {isValidDateString} from '../../utils/validators';
import {DetailScreenProps} from './types';
import {Modal} from './components/Modal';
import {useDetailScreen} from './hooks/useDetailScreen';

export const DetailScreen = ({
  route: {params: product},
  navigation: {navigate, popToTop},
}: DetailScreenProps) => {
  const {openModal, setOpenModal, refetch, loading, error, data} =
    useDetailScreen({product});
  return (
    <View style={styles.container}>
      <View style={styles.detailContainer}>
        <View>
          <Text style={styles.textId}>ID:{product.id}</Text>
          <Text>Información extra</Text>
        </View>
        <View style={styles.infoContainer}>
          {Object.keys(GAPS).map(gap => {
            const isDate = isValidDateString(
              product[gap as keyof typeof product],
            );
            if (isDate) {
              product = {...product, [gap]: isDate};
            }
            const props = {
              key: gap,
              value: product[gap as keyof typeof product],
              gapName: GAPS[gap as keyof typeof GAPS].label,
            };
            return gap === 'logo' ? (
              <LogoRow {...props} />
            ) : (
              <DetailRow {...props} />
            );
          })}
        </View>
      </View>

      <View style={styles.footerContainer}>
        <ButtonTouchable
          label="Editar"
          type="secondary"
          onPress={() => {
            navigate('Form', product);
          }}
        />
        <ButtonTouchable
          label="Eliminar"
          type="danger"
          onPress={() => setOpenModal(true)}
        />
      </View>
      {openModal && (
        <Modal
          {...{
            loading,
            refetch,
            setOpenModal,
            error,
            data,
            handleGoToHome: () => popToTop(),
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  detailContainer: {flex: 1},
  headerContainer: {},
  infoContainer: {marginTop: 10},
  textId: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  footerContainer: {
    alignSelf: 'flex-end',
    width: '100%',
    gap: 10,
  },
});
