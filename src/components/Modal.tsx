import React from 'react';
import {Modal as RNModal, StyleSheet, View} from 'react-native';
import {colors} from '../theme';

interface Props {
  Header?: React.JSX.Element;
  Main?: React.JSX.Element;
  Footer?: React.JSX.Element;
}

export const Modal = ({Header, Main, Footer}: Props) => {
  const HeaderComponent = () => Header;
  const MainComponent = () => Main;
  const FooterComponent = () => Footer;
  return (
    <RNModal animationType="fade" transparent={true} visible={true}>
      <View style={styles.container}>
        <View style={styles.modalView}>
          {Header && (
            <View style={styles.iconContainer}>{<HeaderComponent />}</View>
          )}
          {Main && (
            <View style={styles.textContainer}>{<MainComponent />}</View>
          )}
          {Footer && (
            <View style={styles.buttonsContainer}>{<FooterComponent />}</View>
          )}
        </View>
      </View>
    </RNModal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: colors.backdrop,
  },
  modalView: {
    minHeight: 200,
    backgroundColor: colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  iconContainer: {
    alignItems: 'flex-end',
    width: '100%',
    borderBottomWidth: 1,
    borderColor: colors.secondary,
    padding: 10,
  },

  textContainer: {
    width: '100%',
    borderBottomWidth: 1,
    borderColor: colors.secondary,
    alignItems: 'center',
    padding: 10,
  },
  text: {
    fontWeight: 'bold',
    marginVertical: 40,
  },
  buttonsContainer: {
    width: '100%',
    padding: 10,
    gap: 10,
  },
});
