import { useSearch } from 'modules/context/SearchContext';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import SearchItem from './SearchItem';

const SearchList = () => {
  const { searchList, setSearchIndex, searchIndex } = useSearch();
  const autoRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (autoRef.current) {
      // 스크롤이 존재하면
      if (autoRef.current.scrollHeight > autoRef.current.offsetHeight) {
        const len = searchList.length / 2;
        if (searchIndex > len) {
          autoRef.current?.scrollBy({ top: +35 });
        } else if (searchIndex < len) {
          autoRef.current?.scrollBy({ top: -35 });
        }
      }
    }
  }, [searchIndex]);

  return (
    <S.Wrap ref={autoRef}>
      {searchList && searchList.length > 0
        ? searchList.map((search: any, idx: any) => (
            <S.Item
              key={search.sickCd}
              isFocus={searchIndex === idx ? true : false}
            >
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

  Item: styled.li<{ isFocus?: boolean }>`
    margin-bottom: 20px;
    background-color: ${(props) => (props.isFocus ? '#edf5f5' : '#fff')};
  `,
};
