import getSearchList from 'api/search';
import { useSearch } from 'modules/context/SearchContext';
import { useRef } from 'react';

let timer: NodeJS.Timeout;

const SearchBar = () => {
  const searchRef = useRef(null);
  const { setSearchText, setSearchList } = useSearch();
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(async () => {
      const { value } = e.target;
      console.log(value);

      if (value) {
        const data = await getSearchList<any>({ q: value });

        console.info('calling api');

        setSearchText(value);
        setSearchList(data);
      }
    }, 500);
  };

  return (
    <>
      <input
        ref={searchRef}
        placeholder="검색어를 입력해주세요."
        onChange={onChange}
      />
    </>
  );
};

export default SearchBar;
