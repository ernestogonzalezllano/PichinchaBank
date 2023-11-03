import {useCallback, useEffect, useState} from 'react';
import {BASE_URL} from '../constants';
import {ApiRoutes} from '../types/api';
import {useFocusEffect} from '@react-navigation/native';

interface Props {
  url: ApiRoutes;
  refetchOnMount?: boolean;
  options?: {
    body?: {[key: string]: any};
    method?: 'POST' | 'PUT' | 'DELETE' | 'GET';
    params?: {[key: string]: any};
  };
}

export const useQuery = <T,>({url, refetchOnMount = true, options}: Props) => {
  const [data, setData] = useState<T>();
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState<boolean>(refetchOnMount ?? false);

  const refetch = useCallback(() => {
    setData(undefined);
    setError(undefined);
    setLoading(true);
    const body = options?.body ? JSON.stringify(options.body) : undefined;
    const params = options?.params
      ? '?' + new URLSearchParams(options.params).toString()
      : '';

    fetch(`${BASE_URL}${url}${params}`, {
      ...options,
      body,
      headers: {
        authorId: '10',
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Something was wrong');
        }
        return response.text().then(textResponse => {
          let result = textResponse;
          try {
            result = JSON.parse(textResponse);
          } catch {}
          return result as T;
        });
      })
      .then(result => {
        setData(result);
      })
      .catch(() => {
        setError('Error al obtener datos de la API');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [options, url]);

  const myFunction = useCallback(() => {
    if (url && refetchOnMount) {
      refetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    return () => {
      setData(undefined);
      setError(undefined);
    };
  }, []);

  useFocusEffect(myFunction);
  return {data, error, refetch, loading};
};
