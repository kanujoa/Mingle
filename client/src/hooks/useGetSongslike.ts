import { AxiosInstance } from 'axios';
import { useQuery } from 'react-query';
import { useAxios } from '../utils';

export function useGetSongslike() {
  const axios: AxiosInstance = useAxios();

  return useQuery('userUploadedSongs', async () => {
    const res = await axios.get(`/api/songs?orderby=top`);
    console.log(res);
    return res;
  });
}
