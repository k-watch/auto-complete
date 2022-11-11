import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { searchSelector } from 'modules/search/search';
import { SEARCH_MOVE_DIR } from 'types/enum';
import SearchItem from './SearchItem';
import styled from 'styled-components';
import { boxShadow, flexBox } from 'styles/mixins';

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
    // KeyDown 여부에 따라 스크롤 위치를 맞춤
    if (ulRef.current) {
      const refCurrent = ulRef.current;

      // 스크롤 존재 확인
      if (refCurrent.scrollHeight > refCurrent.offsetHeight) {
        const liElement = refCurrent.children[searchMoveIndex] as HTMLLIElement;
        const elHeight = liElement.offsetHeight;
        // elEndIndex = el 요소 마지막 값
        const elEndIndex = searchList.length - SELECT_POS.CENTER;

        if (
          searchMoveIndex < elEndIndex &&
          searchMoveDir === SEARCH_MOVE_DIR.UP
        ) {
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
    <>
      {searchList && searchList.length > 0 && (
        <S.Wrap ref={ulRef}>
          {searchList.map((search: SearchProps, index: number) => (
            <S.Item
              key={search.sickCd}
              isSelect={searchMoveIndex === index ? true : false}
            >
              <SearchItem {...search} />
            </S.Item>
          ))}
        </S.Wrap>
      )}
    </>
  );
};

export default SearchList;

const S = {
  Wrap: styled.ul`
    width: 500px;
    height: 400px;
    overflow: auto;
    margin: 0px auto;
    background-color: white;
    border-radius: 12px;
    ${boxShadow()};

    ::-webkit-scrollbar {
      width: 10px;
    }
    ::-webkit-scrollbar-thumb {
      height: 30%;
      border-radius: 8px;
      background: ${({ theme }) => theme.colors.grey};
    }
    ::-webkit-scrollbar-track {
      background: transparent;
    }
  `,

  Item: styled.li<{ isSelect?: boolean }>`
    padding: 10px 10px;
    background-color: ${(props) => (props.isSelect ? '#f0f0f0' : 'white')};
  `,

  NotSearchResult: styled.li`
    ${flexBox()}
  `,
};
