import {useEffect} from 'react';
import {useQuery} from '../../../hooks/useQuery';

export const useValidateId = ({id, isEdit}: {id?: string; isEdit: boolean}) => {
  const {data: validateId, refetch: validateIdRefetch} = useQuery<boolean>({
    url: '/bp/products/verification',
    refetchOnMount: false,
    options: {params: {id}, method: 'GET'},
  });

  useEffect(() => {
    if (id && !isEdit) {
      validateIdRefetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  return {validateId};
};
