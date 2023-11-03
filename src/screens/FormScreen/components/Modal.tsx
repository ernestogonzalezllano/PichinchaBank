import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Modal as ModalBase} from '../../../components/Modal';
import {ButtonTouchable} from '../../../components/ButtonTouchable';

export const Modal = ({
  popToTop,
  error,
}: {
  popToTop: () => void;
  error?: string;
}) => {
  let text = 'Realizado!';
  let onPress = () => popToTop();
  let label = 'Volver al inicio';
  if (error) {
    text = 'Ocurrió un error, reintente.';
    label = 'Reintentar';
  }
  return (
    <ModalBase
      Main={
        <View style={styles.modal}>
          <Text>{text}</Text>
        </View>
      }
      Footer={<ButtonTouchable {...{label, onPress}} />}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  buttonsContainer: {
    width: '100%',
    gap: 10,
  },
  modal: {
    marginVertical: 100,
  },
});
