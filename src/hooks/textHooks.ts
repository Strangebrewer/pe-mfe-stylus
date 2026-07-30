import { useQuery } from '@tanstack/react-query';
import textApi from '../api/textApi';

export const useGetThings = () => {
  return useQuery({
    queryKey: ['get-texts'],
    queryFn: async () => {
      const { data = [] } = await textApi.get();
      return data;
    },
  });
};
