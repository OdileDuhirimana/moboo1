import { useState } from 'react';
import { Alert } from 'react-native';

export function useApi<T>(apiFunction: (...args: any[]) => Promise<T>) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const request = async (...args: any[]) => {
    setLoading(true);
    try {
      const result = await apiFunction(...args);
      setData(result);
      setError(null);
      return result;
    } catch (err: any) {
      setError(err.message || 'Unexpected Error!');
      Alert.alert('Error', err.message || 'Something went wrong');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { data, error, loading, request };
}