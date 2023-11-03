import * as React from 'react';
import * as useQuery from '../../../src/hooks/useQuery';
import * as useValidateId from '../../../src/screens/FormScreen/hooks/useValidateId';

import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react-native';
import {NavigationContainer} from '@react-navigation/native';
import {FormScreen} from '../../../src/screens/FormScreen/FormScreen';
import {FormScreenProps} from '../../../src/screens/FormScreen/types';
import {productMocked as originalProductMocked} from '../../../__mocks__/productMocked';

const productMocked = {...originalProductMocked};
const popToTop = jest.fn();

const props = {
  navigation: {
    popToTop,
  },
  route: {},
} as unknown as FormScreenProps;

describe('FormScreen', () => {
  test('Should match with snapshot', async () => {
    const component = render(
      <NavigationContainer>
        <FormScreen {...props} />
      </NavigationContainer>,
    ).toJSON();

    expect(component).toMatchSnapshot();
  });

  test('Should autofill date_revision when date_release is changed', async () => {
    const modifiedProps = {
      ...props,
      route: {...props.route, params: productMocked},
    };
    render(
      <NavigationContainer>
        <FormScreen {...modifiedProps} />
      </NavigationContainer>,
    );
    const input = await screen.findByDisplayValue(productMocked.date_release);
    fireEvent.changeText(input, '2022-11-11');
    await waitFor(() => {
      const newTextElement = screen.getByDisplayValue('2023-11-09');
      expect(newTextElement).toBeOnTheScreen();
    });
  });
  test('Should clean gaps when "Reiniciar" button is pressed', async () => {
    const modifiedProps = {
      ...props,
      route: {...props.route, params: productMocked},
    };
    render(
      <NavigationContainer>
        <FormScreen {...modifiedProps} />
      </NavigationContainer>,
    );
    const button = screen.getByText('Reiniciar');
    fireEvent.press(button);
    await waitFor(() => {
      const algo = screen.queryByDisplayValue(productMocked.date_release);
      expect(algo).toBeNull();
    });
  });
  test('Should validate gaps on submit and show errors', async () => {
    render(
      <NavigationContainer>
        <FormScreen {...props} />
      </NavigationContainer>,
    );
    fireEvent.press(screen.getByText('Enviar'));
    expect(screen.getAllByText('Este campo es requerido')).toHaveLength(5);
  });
  test('Should validate gaps on submit and refetch data', async () => {
    refetchTest();
  });
  test('Should show modal on refetch success', async () => {
    refetchTest();
    await waitFor(() => {
      expect(screen.getByText('Realizado!')).toBeOnTheScreen();
    });
  });
  test('Should go to main page when "Volver al inicio" button is pressed', async () => {
    refetchTest();

    fireEvent.press(screen.getByText('Volver al inicio'));
    expect(popToTop).toHaveBeenCalled();
  });
});

const refetchTest = () => {
  const refetch = jest.fn();

  jest.spyOn(useValidateId, 'useValidateId').mockReturnValue({
    validateId: false,
  });
  jest.spyOn(useQuery, 'useQuery').mockReturnValue({
    data: {data: 'test'},
    error: undefined,
    refetch,
    loading: false,
  });
  const modifiedProps = {
    ...props,
    route: {...props.route, params: productMocked},
  };
  render(
    <NavigationContainer>
      <FormScreen {...modifiedProps} />
    </NavigationContainer>,
  );
  fireEvent.press(screen.getByText('Enviar'));
  expect(refetch).toHaveBeenCalled();
};
