import { useSearch } from 'modules/context/SearchContext';
import { useEffect } from 'react';
import styled from 'styled-components';
import SearchItem from './SearchItem';

const SearchList = () => {
  const { searchList } = useSearch();
  console.log(searchList);
  return (
    <S.Wrap>
      {searchList && searchList.length > 0
        ? searchList.map((search: any) => (
            <S.Item key={search.sickCd}>
              <SearchItem search={search} />
            </S.Item>
          ))
        : '검색어 없음'}
    </S.Wrap>
  );
};

export default SearchList;

const S = {
  Wrap: styled.ul`
    height: 400px;
    padding: 20px;
    overflow: auto;
    border: 1px solid black;
  `,

  Item: styled.li`
    margin-bottom: 20px;
  `,
};
