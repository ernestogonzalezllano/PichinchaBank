import * as React from 'react';
import * as useQuery from '../../../src/hooks/useQuery';
import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react-native';
import {NavigationContainer} from '@react-navigation/native';

import {HomeScreen} from '../../../src/screens/HomeScreen/HomeScreen';
import {HomeProps} from '../../../src/screens/HomeScreen/types';

import {productMocked as originalProductMocked} from '../../../__mocks__/productMocked';

const productMocked = {...originalProductMocked};
const navigate = jest.fn();

const props = {
  navigation: {
    navigate,
  },
  route: {},
} as unknown as HomeProps;

describe('HomeScreen', () => {
  test('Should match with snapshot', async () => {
    const component = renderScreen().component.toJSON();
    expect(component).toMatchSnapshot();
  });
  test('Should show skeleton when is loading', async () => {
    renderScreen(undefined, undefined, true);
    expect(screen.getAllByTestId('HomeCardSkeleton')).toHaveLength(10);
  });
  test('Should filter when search', async () => {
    renderScreen([productMocked, {...productMocked, id: '5678'}]);
    fireEvent.changeText(screen.getByPlaceholderText('Buscar...'), '5678');
    await waitFor(() => {
      expect(screen.getAllByText(productMocked.name)).toHaveLength(1);
    });
  });
  test('Should go to ScreenForm when "Agregar" button is pressed', async () => {
    renderScreen();
    fireEvent.press(screen.getByText('Agregar'));
    expect(navigate).toHaveBeenCalledWith('Form');
  });
  test('Should go to ScreenDetail when CardProduct is pressed', async () => {
    renderScreen();
    fireEvent.press(screen.getByText(productMocked.name));
    expect(navigate).toHaveBeenCalledWith('Detail', productMocked);
  });
});

const renderScreen = (
  data = [productMocked],
  error = undefined,
  loading = false,
) => {
  const refetch = jest.fn();

  jest.spyOn(useQuery, 'useQuery').mockReturnValue({
    data,
    error,
    refetch,
    loading,
  });
  const component = render(
    <NavigationContainer>
      <HomeScreen {...props} />
    </NavigationContainer>,
  );
  return {component, refetch};
};
