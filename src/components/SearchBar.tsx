import getSearchList from 'api/search';
import { openDB } from 'idb';
import { useRef } from 'react';
import { SEARCH_MOVE_DIR } from 'types/enum';
import { useSelector } from 'react-redux';
import {
  searchSelector,
  setSearchList,
  setSearchMoveDir,
  setSearchMoveIndex,
  setSearchWord,
} from 'modules/search/search';
import { store } from 'modules/store';

let timer: NodeJS.Timeout;

let db;

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
        db = await openDB('SearchDB', 1, {
          upgrade(db) {
            const store = db.createObjectStore('search', {
              keyPath: 'id',
              autoIncrement: true,
            });
            store.createIndex('id', 'id');
          },
        });
        let tx = db.transaction('search');
        let st = tx.objectStore('search');

        let re = await st.get(value);
        if (re) {
          if (re.expireTime <= Date.now()) {
            db.delete('search', value);
          } else {
            store.dispatch(setSearchWord(value));
            store.dispatch(setSearchList(re.data));
            return;
          }
        }

        const data = await getSearchList<any>({ sickNm_like: value });

        re = await db.add('search', {
          id: value,
          data: data,
          expireTime: new Date().getTime() + 1000 * 60 * 5,
        });

        store.dispatch(setSearchWord(value));
        store.dispatch(setSearchList(data));
      }
    }, 100);
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
