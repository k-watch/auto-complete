import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { searchSelector } from 'modules/search/search';
import { SEARCH_MOVE_DIR } from 'types/enum';
import SearchItem from './SearchItem';
import styled from 'styled-components';
import { flexBox } from 'styles/mixins';

const SELECT_POS = {
  CENTER: 5,
} as const;

export interface SearchProps {
  sickCd: string;
  sickNm: string;
}

const SearchList = () => {
  const ulRef = useRef<HTMLUListElement>(null);
  const { searchList, searchMoveDir, searchMoveIndex } =
    useSelector(searchSelector);

  useEffect(() => {
    if (ulRef.current) {
      const refCurrent = ulRef.current;

      // 스크롤 존재 확인
      if (refCurrent.scrollHeight > refCurrent.offsetHeight) {
        const liElement = refCurrent.children[searchMoveIndex] as HTMLLIElement;
        const elHeight = liElement.offsetHeight;
        // elEnd = el 요소 마지막 값
        const elEnd = searchList.length - SELECT_POS.CENTER;

        if (searchMoveIndex < elEnd && searchMoveDir === SEARCH_MOVE_DIR.UP) {
          refCurrent.scrollBy({
            top: -`${elHeight}`,
          });
        } else if (
          searchMoveIndex > SELECT_POS.CENTER &&
          searchMoveDir === SEARCH_MOVE_DIR.DOWN
        ) {
          refCurrent.scrollBy({ top: elHeight });
        }
      }
    }
  }, [searchMoveIndex]);

  return (
    <S.Wrap ref={ulRef}>
      {searchList && searchList.length > 0 ? (
        searchList.map((search: SearchProps, index: number) => (
          <S.Item
            key={search.sickCd}
            isSelect={searchMoveIndex === index ? true : false}
          >
            <SearchItem {...search} />
          </S.Item>
        ))
      ) : (
        <S.NotSearchResult>검색어 없음</S.NotSearchResult>
      )}
    </S.Wrap>
  );
};

export default SearchList;

const S = {
  Wrap: styled.ul`
    height: 400px;
    overflow: auto;
    margin-top: 30px;
    background-color: white;
    border-radius: 20px;
    scrollbar-width: none;

    ::-webkit-scrollbar {
      display: none;
    }
  `,

  Item: styled.li<{ isSelect?: boolean }>`
    padding: 10px 10px;
    background-color: ${(props) => (props.isSelect ? '#f0f0f0' : '#fffff')};
  `,

  NotSearchResult: styled.li`
    ${flexBox()}
  `,
};
