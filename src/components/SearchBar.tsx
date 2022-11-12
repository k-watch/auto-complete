import { SearchInterface } from 'types/api';
import { CacheInstance } from 'service/cacheInstance';
import { useState } from 'react';
import { SEARCH_MOVE_DIR } from 'types/enum';
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
import { getSearchList } from 'api/search';
import { ReactComponent as SearchIcon } from 'styles/icons/search.svg';
import styled from 'styled-components';

const DELAY_TIME = 300;

const cacheInstance = new CacheInstance<string, SearchInterface>();

const SearchBar = () => {
  const [searchText, setSearchText] = useState('');
  const { searchList, searchMoveIndex } = useSelector(searchSelector);

  const processSearchResult = async () => {
    if (searchText) {
      store.dispatch(setSearchMoveIndex(0));
      // 검색 결과 캐싱되어 있는지 확인
      const searchData = cacheInstance.get(searchText);

      // 캐싱됐고, 만료시간 전이면 api 호출 패스
      if (searchData) {
        store.dispatch(setSearchWord(searchText));
        store.dispatch(setSearchList(searchData));
        return;
      }

      // 캐싱 안됐으면 api 호출
      const data = await getSearchList({
        sickNm_like: searchText,
      });

      if (data) {
        store.dispatch(setSearchWord(searchText));
        store.dispatch(setSearchList(data));

        // 결과 값 캐싱
        cacheInstance.set(searchText, data);
      }
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
      <SearchIcon height={16} />
    </S.Wrap>
  );
};

export default SearchBar;

const S = {
  Wrap: styled.div`
    position: relative;
    width: 500px;
    margin: 50px auto;
    margin-bottom: 15px;

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
      top: 36%;
      left: 3.5%;
      color: ${({ theme }) => theme.colors.darkGrey};
    }
  `,
};
