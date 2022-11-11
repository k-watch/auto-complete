import { useState } from 'react';
import { EXPIRE_TIME, SEARCH_MOVE_DIR } from 'types/enum';
import { useDebounce } from 'modules/hooks/useDebounce';
import { useSelector } from 'react-redux';
import {
  searchSelector,
  setSearchList,
  setSearchMoveDir,
  setSearchMoveIndex,
  setSearchWord,
} from 'modules/search/search';
import { store } from 'modules/store';
import { SearchDBInterface } from 'types/api';
import { dbInstance } from 'service/dbInstance';
import { getSearchList } from 'api/search';
import { ReactComponent as Search } from 'styles/icons/search.svg';
import styled from 'styled-components';

const DELAY_TIME = 300;

const SearchBar = () => {
  const [searchText, setSearchText] = useState('');
  const { searchList, searchMoveIndex } = useSelector(searchSelector);

  const processSearchResult = async () => {
    if (searchText) {
      store.dispatch(setSearchMoveIndex(0));
      // IndexedDB 에서 검색 결과 있는지 확인
      const searchData = await dbInstance.get(searchText);

      // 결과 있으면 api 호출 패스
      if (searchData) {
        store.dispatch(setSearchWord(searchText));
        store.dispatch(setSearchList(searchData));

        return;
      }

      // 결과 없으면 api 호출
      const data = await getSearchList({
        sickNm_like: searchText,
      });

      store.dispatch(setSearchWord(searchText));
      store.dispatch(setSearchList(data));

      // 결과 값 IndexedDB에 저장
      dbInstance.add<SearchDBInterface>({
        id: searchText,
        data,
        expireTime: new Date().getTime() + EXPIRE_TIME,
      });
    } else {
      store.dispatch(setSearchList([]));
    }
  };

  useDebounce(processSearchResult, searchText, DELAY_TIME);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (searchList && searchList.length > 0) {
      switch (e.key) {
        case SEARCH_MOVE_DIR.UP:
          if (searchMoveIndex > 0) {
            store.dispatch(setSearchMoveIndex(searchMoveIndex - 1));
            store.dispatch(setSearchMoveDir(SEARCH_MOVE_DIR.UP));
          }
          return;
        case SEARCH_MOVE_DIR.DOWN:
          if (searchMoveIndex < searchList.length - 1) {
            store.dispatch(setSearchMoveIndex(searchMoveIndex + 1));
            store.dispatch(setSearchMoveDir(SEARCH_MOVE_DIR.DOWN));
          }
          return;
      }
    }
  };

  return (
    <S.Wrap>
      <input
        onKeyDown={handleKeyDown}
        placeholder="검색어를 입력해주세요."
        onChange={(e) => setSearchText(e.target.value)}
      />
      <Search height={16} />
    </S.Wrap>
  );
};

export default SearchBar;

const S = {
  Wrap: styled.div`
    position: relative;
    width: 500px;
    margin: 50px auto;

    input {
      width: 100%;
      padding: 20px 40px;
      border-radius: 40px;
      font-size: 18px;
      font-weight: bold;

      ::placeholder {
        color: ${({ theme }) => theme.colors.darkGrey};
      }
    }

    svg {
      position: absolute;
      top: 35%;
      left: 3.5%;
      color: ${({ theme }) => theme.colors.darkGrey};
    }
  `,
};
