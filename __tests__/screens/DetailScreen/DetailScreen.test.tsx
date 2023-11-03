import * as React from 'react';
import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react-native';
import {NavigationContainer} from '@react-navigation/native';

import {DetailScreen} from '../../../src/screens/DetailScreen/DetailScreen';
import {DetailScreenProps} from '../../../src/screens/DetailScreen/types';

import {productMocked as originalProductMocked} from '../../../__mocks__/productMocked';

const productMocked = {
  ...originalProductMocked,
};
const navigate = jest.fn();

const props = {
  navigation: {
    navigate,
  },
  route: {
    params: productMocked,
  },
} as unknown as DetailScreenProps;

describe('DetailScreen', () => {
  test('Should match with snapshot', async () => {
    const component = renderComponent();
    expect(component).toMatchSnapshot();
  });
  test('Should go to ScreenForm when "Editar" button is pressed', async () => {
    renderComponent();
    fireEvent.press(screen.getByText('Editar'));
    expect(navigate).toHaveBeenCalledWith('Form', {
      ...productMocked,
      date_release: '2024-11-10',
      date_revision: '2025-11-10',
    });
  });
  test('Should close Modal when "Cancelar" button is pressed', async () => {
    await renderModal();
    fireEvent.press(screen.getByText('Cancelar'));
    await waitFor(() => {
      expect(screen.queryByText('Estas seguro de eliminar?')).toBeNull();
    });
  });
  test('Should close Modal when CloseIcon is pressed', async () => {
    await renderModal();
    fireEvent.press(screen.getByTestId('CloseIcon'));
    await waitFor(() => {
      expect(screen.queryByText('Estas seguro de eliminar?')).toBeNull();
    });
  });
});

const renderComponent = () => {
  const component = render(
    <NavigationContainer>
      <DetailScreen {...props} />
    </NavigationContainer>,
  );
  return component;
};

const renderModal = async () => {
  renderComponent();
  fireEvent.press(screen.getByText('Eliminar'));
  await waitFor(() => {
    expect(screen.getByText('Estas seguro de eliminar?')).toBeOnTheScreen();
  });
};
