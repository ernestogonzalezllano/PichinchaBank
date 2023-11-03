import {useState} from 'react';
import {useQuery} from '../../../hooks/useQuery';
import {Product} from '../../../types/api';

export const useDetailScreen = ({product}: {product: Readonly<Product>}) => {
  const [openModal, setOpenModal] = useState(false);
  const {refetch, loading, error, data} = useQuery<string>({
    url: '/bp/products',
    options: {method: 'DELETE', params: {id: product.id}},
    refetchOnMount: false,
  });
  return {openModal, setOpenModal, refetch, loading, error, data};
};
