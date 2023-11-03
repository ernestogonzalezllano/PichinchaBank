import {useEffect, useState} from 'react';
import {FormGaps} from '../types';
import {useQuery} from '../../../hooks/useQuery';
import {validations} from '../utils';
import {Product} from '../../../types/api';

const defaultFormData = {
  id: undefined,
  date_release: undefined,
  date_revision: undefined,
  description: undefined,
  logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
  name: undefined,
};

export const useFormScreen = ({
  product,
}: {
  product: Readonly<Product | undefined>;
}) => {
  const isEdit = !!product;
  const [formData, setFormData] = useState<FormGaps>(
    product ?? defaultFormData,
  );
  const [errors, setErrors] = useState({});

  const {data, refetch, error, loading} = useQuery<Product>({
    url: '/bp/products',
    refetchOnMount: false,
    options: {body: formData, method: product ? 'PUT' : 'POST'},
  });

  const {data: validateId, refetch: validateIdRefetch} = useQuery<boolean>({
    url: '/bp/products/verification',
    refetchOnMount: false,
    options: {params: {id: formData.id}, method: 'GET'},
  });

  useEffect(() => {
    if (formData.id && !isEdit) {
      validateIdRefetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.id]);

  const handleSubmit = () => {
    const validate = validations(formData, validateId);
    if (Object.keys(validate).length) {
      setErrors(validate);
    } else {
      refetch();
    }
  };
  return {
    setFormData,
    setErrors,
    errors,
    data,
    error,
    loading,
    handleSubmit,
    formData,
    defaultFormData,
    isEdit,
  };
};
