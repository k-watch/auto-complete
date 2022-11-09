import React, { createContext, useState, useContext } from 'react';

type State = {
  searchList: any;
};

const SearchContext = createContext<any>(null);
// const SearchUpdateContext = createContext(null);

const SearchContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [searchText, setSearchText] = useState<any>();
  const [searchList, setSearchList] = useState<any>();
  const [searchIndex, setSearchIndex] = useState<number>(-1);

  return (
    <SearchContext.Provider
      value={{
        searchText,
        setSearchText,
        searchList,
        setSearchList,
        searchIndex,
        setSearchIndex,
      }}
    >
      {/* <SearchUpdateContext.Provider value={setSearchList}> */}
      {children}
      {/* </SearchUpdateContext.Provider> */}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  return useContext(SearchContext);
};

// export const useSearchUpdate = () => {
//   return useContext(SearchUpdateContext);
// };

export { SearchContextProvider };
