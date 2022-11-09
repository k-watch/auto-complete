import getSearchList from 'api/search';
import { openDB } from 'idb';
import { useSearch } from 'modules/context/SearchContext';
import { useEffect, useRef } from 'react';

let timer: NodeJS.Timeout;
const ArrowDown = 'ArrowDown';
const ArrowUp = 'ArrowUp';
const Escape = 'Escape';

let db;

const SearchBar = () => {
  const searchRef = useRef(null);
  const {
    searchList,
    setSearchText,
    setSearchList,
    setSearchIndex,
    searchIndex,
  } = useSearch();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(async () => {
      const { value } = e.target;
      console.log(value);

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
        let store = tx.objectStore('search');

        let re = await store.get(value);
        if (re) {
          if (re.expireTime <= Date.now()) {
            db.delete('search', value);
          } else {
            setSearchText(value);
            setSearchList(re.data);
            return;
          }
        }

        const data = await getSearchList<any>({ q: value });

        re = await db.add('search', {
          id: value,
          data: data,
          expireTime: new Date().getTime() + 1000 * 60 * 5,
        });
        console.info('calling api');

        setSearchText(value);
        setSearchList(data);
      }
    }, 100);
  };

  const handleKeyArrow = (e: React.KeyboardEvent) => {
    if (searchList && searchList.length > 0) {
      switch (e.key) {
        case ArrowDown: //키보드 아래 키
          if (searchIndex + 1 < searchList.length) {
            setSearchIndex(searchIndex + 1);
          }
          break;
        case ArrowUp: //키보드 위에 키
          if (searchIndex - 1 > -1) {
            setSearchIndex(searchIndex - 1);
          }
          break;
        case Escape: // esc key를 눌렀을때,
          setSearchIndex(-1);
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
