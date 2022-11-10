import { searchSelector } from 'modules/search/search';
import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { SEARCH_MOVE_DIR } from 'types/enum';
import SearchItem from './SearchItem';

const SearchList = () => {
  const autoRef = useRef<any>(null);
  const { searchList, searchMoveDir, searchMoveIndex } =
    useSelector(searchSelector);

  useEffect(() => {
    if (autoRef.current) {
      // 스크롤이 존재하면
      if (autoRef.current.scrollHeight > autoRef.current.offsetHeight) {
        const val = autoRef.current.children[searchMoveIndex].offsetHeight + 20;
        const end = searchList.length - 5;
        if (searchMoveIndex < end) {
          if (searchMoveDir === SEARCH_MOVE_DIR.UP)
            autoRef.current?.scrollBy({
              top: -`${val}`,
            });
        }
        if (searchMoveIndex > 5) {
          if (searchMoveDir === SEARCH_MOVE_DIR.DOWN)
            autoRef.current?.scrollBy({ top: val });
        }
      }
    }
  }, [searchMoveIndex]);

  return (
    <S.Wrap ref={autoRef}>
      {searchList && searchList.length > 0
        ? searchList.map((search: any, idx: any) => (
            <S.Item
              key={search.sickCd}
              isFocus={searchMoveIndex === idx ? true : false}
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
