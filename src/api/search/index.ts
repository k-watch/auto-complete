import axiosInstance from 'api';
import { API_URL } from 'types/enum';

export const getSearchList = async <T>(params: T) => {
  console.log('호출');
  const { data } = await axiosInstance.get<T>(API_URL.GET_SEARCH_LIST, {
    params,
  });
  return data;
};

export default getSearchList;
