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
import { add, get } from 'api/service';
import { SearchInterface } from 'types/api';
import { dbInstance } from 'api/service/dbInstance';

let timer: NodeJS.Timeout;

const SearchBar = () => {
  const searchRef = useRef(null);
  const { searchList, searchMoveIndex } = useSelector(searchSelector);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(async () => {
      const { value } = e.target;

      if (value) {
        const searchData = await dbInstance.get(value);

        if (searchData) {
          store.dispatch(setSearchWord(value));
          store.dispatch(setSearchList(searchData));

          return;
        }

        const data = await getSearchList<SearchInterface[]>({
          sickNm_like: value,
        });

        await dbInstance.add({
          id: value,
          data,
          expireTime: new Date().getTime() + EXPIRE_TIME,
        });

        store.dispatch(setSearchWord(value));
        store.dispatch(setSearchList(data));
      }
    }, 300);
  };

  const handleKeyArrow = (e: React.KeyboardEvent) => {
    if (searchList && searchList.length > 0) {
      switch (e.key) {
        case SEARCH_MOVE_DIR.DOWN: //키보드 아래 키
          if (searchMoveIndex + 1 < searchList.length) {
            store.dispatch(setSearchMoveIndex(searchMoveIndex + 1));
            store.dispatch(setSearchMoveDir(SEARCH_MOVE_DIR.DOWN));
          }
          break;
        case SEARCH_MOVE_DIR.UP: //키보드 위에 키
          if (searchMoveIndex - 1 > -1) {
            store.dispatch(setSearchMoveIndex(searchMoveIndex - 1));
            store.dispatch(setSearchMoveDir(SEARCH_MOVE_DIR.UP));
          }
          break;
      }
    }
  };

  return (
    <>
      <input
        ref={searchRef}
        onKeyDown={handleKeyArrow}
        placeholder="검색어를 입력해주세요."
        onChange={onChange}
      />
    </>
  );
};

export default SearchBar;
