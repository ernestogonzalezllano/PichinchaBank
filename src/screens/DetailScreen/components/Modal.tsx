import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {ButtonTouchable} from '../../../components/ButtonTouchable';
import {Modal as BaseModal} from '../../../components/Modal';
import {Spinner} from '../../../components/Spinner';
import {colors} from '../../../theme';

const Header = ({
  setOpenModal,
}: {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => (
  <TouchableOpacity testID={'CloseIcon'} onPress={() => setOpenModal(false)}>
    <Image
      style={styles.icon}
      source={require('../../../../assets/close.png')}
    />
  </TouchableOpacity>
);
const Main = ({loading, text}: {loading: boolean; text: string}) =>
  loading ? (
    <Spinner color={colors.primary} size={'large'} />
  ) : (
    <Text style={styles.text}>{text}</Text>
  );

const Footer = ({
  setOpenModal,
  onConfirm,
  loading,
  topButtonText,
  bottomButtonText,
  success,
  error,
}: {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  onConfirm: () => void;
  loading: boolean;
  topButtonText: string;
  bottomButtonText: string;
  success?: boolean;
  error?: boolean;
}) => (
  <>
    {!error && (
      <ButtonTouchable
        disabled={loading}
        label={topButtonText}
        onPress={onConfirm}
      />
    )}
    {!success && (
      <ButtonTouchable
        type="secondary"
        label={bottomButtonText}
        disabled={loading}
        onPress={() => setOpenModal(false)}
      />
    )}
  </>
);

export const Modal = ({
  setOpenModal,
  refetch,
  loading,
  error,
  data,
  handleGoToHome,
}: {
  setOpenModal: (value: React.SetStateAction<boolean>) => void;
  refetch: () => void;
  loading: boolean;
  error?: string;
  data?: string;
  handleGoToHome: () => void;
}) => {
  let text = 'Estas seguro de eliminar?';
  let topButtonText = 'Confirmar';
  let bottomButtonText = 'Cancelar';
  let onConfirm = refetch;

  if (data) {
    text = 'Listo. Producto eliminado.';
    topButtonText = 'Volver al inicio';
    onConfirm = handleGoToHome;
  }
  if (error) {
    text = 'Ocurrió un error, reintente.';
  }
  const modalProps = {
    Header: <Header {...{setOpenModal}} />,
    Main: <Main {...{loading, text}} />,
    Footer: (
      <Footer
        {...{
          setOpenModal,
          onConfirm,
          loading,
          topButtonText,
          bottomButtonText,
          success: !!data,
          error: !!error,
        }}
      />
    ),
  };
  return <BaseModal {...modalProps} />;
};

const styles = StyleSheet.create({
  text: {
    fontWeight: 'bold',
    marginVertical: 40,
  },
  icon: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
  },
});
