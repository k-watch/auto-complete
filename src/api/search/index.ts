import axiosInstance from 'api';
import { API_URL } from 'types/enum';

export const getSearchList = async <T>(params: any) => {
  console.info('calling api');

  const { data } = await axiosInstance.get<T>(API_URL.GET_SEARCH_LIST, {
    params,
  });

  return data;
};

export default getSearchList;
