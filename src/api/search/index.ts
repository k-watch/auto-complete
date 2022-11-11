import { httpInstance } from 'api/httpInstance';
import { SearchInterface } from 'types/api';
import { API_URL } from 'types/enum';

export const getSearchList = async (params: {}) => {
  let data = null;

  try {
    data = await httpInstance.get<SearchInterface[]>(API_URL.GET_SEARCH_LIST, {
      params,
    });
  } catch (e) {
    console.log(e);
  }

  return data;
};
