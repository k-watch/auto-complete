import getSearchList from 'api/search';
import { useRef } from 'react';
import { EXPIRE_TIME, SEARCH_MOVE_DIR } from 'types/enum';
import { useSelector } from 'react-redux';
import {
  searchSelector,
  setSearchList,
  setSearchMoveDir,
  setSearchMoveIndex,
  setSearchWord,
} from 'modules/search/search';
import { store } from 'modules/store';
import { SearchInterface } from 'types/api';
import { dbInstance } from 'api/service/dbInstance';

let timer: NodeJS.Timeout | null = null;

const SearchBar = () => {
  const searchRef = useRef(null);
  const { searchList, searchMoveIndex } = useSelector(searchSelector);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(async () => {
      const { value } = e.target;

      if (value) {
        store.dispatch(setSearchMoveIndex(0));
        // IndexedDB 에서 검색 결과 있는지 확인
        const searchData = await dbInstance.get(value);

        // 결과 있으면 api 호출 패스
        if (searchData) {
          store.dispatch(setSearchWord(value));
          store.dispatch(setSearchList(searchData));

          return;
        }

        // 결과 없으면 api 호출
        const data = await getSearchList<SearchInterface[]>({
          sickNm_like: value,
        });

        store.dispatch(setSearchWord(value));
        store.dispatch(setSearchList(data));

        // 결과 값 IndexedDB에 저장
        dbInstance.add({
          id: value,
          data,
          expireTime: new Date().getTime() + EXPIRE_TIME,
        });
      } else {
        store.dispatch(setSearchList([]));
      }
    }, 300);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (searchList && searchList.length > 0) {
      switch (e.key) {
        case SEARCH_MOVE_DIR.UP: //키보드 위에 키
          if (searchMoveIndex > 0) {
            store.dispatch(setSearchMoveIndex(searchMoveIndex - 1));
            store.dispatch(setSearchMoveDir(SEARCH_MOVE_DIR.UP));
          }
          return;
        case SEARCH_MOVE_DIR.DOWN: //키보드 아래 키
          if (searchMoveIndex < searchList.length - 1) {
            store.dispatch(setSearchMoveIndex(searchMoveIndex + 1));
            store.dispatch(setSearchMoveDir(SEARCH_MOVE_DIR.DOWN));
          }
          return;
      }
    }
  };

  return (
    <>
      <input
        ref={searchRef}
        onKeyDown={handleKeyDown}
        placeholder="검색어를 입력해주세요."
        onChange={handleChange}
      />
    </>
  );
};

export default SearchBar;
