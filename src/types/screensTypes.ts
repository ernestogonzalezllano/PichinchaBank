import {Product} from './api';

export type RootStackParamList = {
  Home: undefined;
  Detail: Product;
  Form?: Product;
};
