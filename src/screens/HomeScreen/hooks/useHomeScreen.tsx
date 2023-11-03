import {useDeferredValue, useState} from 'react';
import {useQuery} from '../../../hooks/useQuery';
import {Product} from '../../../types/api';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../types/screensTypes';

export const useHomeScreen = ({
  navigation: {navigate},
}: {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home', undefined>;
}) => {
  const [search, setSearch] = useState<string>();
  const deferredQuery = useDeferredValue(search);
  const {data, loading} = useQuery<Product[]>({
    url: '/bp/products',
  });
  const handleGoToDetail = (product: Product) => {
    navigate('Detail', product);
  };

  const handleGoToForm = () => {
    navigate('Form');
  };
  return {
    setSearch,
    deferredQuery,
    data,
    loading,
    handleGoToDetail,
    handleGoToForm,
  };
};
