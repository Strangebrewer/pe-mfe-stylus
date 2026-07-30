import { useQuery } from '@tanstack/react-query';
import subjectApi from '../api/subjectApi';

export const useGetSubjects = () => {
  return useQuery({
    queryKey: ['get-subjects'],
    queryFn: async () => {
      const { data = [] } = await subjectApi.get();
      return data;
    },
  });
};
