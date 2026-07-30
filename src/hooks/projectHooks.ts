import { useQuery } from '@tanstack/react-query';
import projectApi from '../api/projectApi';

export const useGetProjects = () => {
  return useQuery({
    queryKey: ['get-projects'],
    queryFn: async () => {
      const { data = [] } = await projectApi.get();
      return data;
    },
  });
};
