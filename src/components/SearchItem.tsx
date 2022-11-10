import { searchSelector } from 'modules/search/search';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { SearchProps } from './SearchList';

const checkWord = (resultWord: string, searchWord: string) => {
  if (resultWord.toUpperCase().includes(searchWord.toUpperCase())) {
    return resultWord.split(new RegExp(`(${searchWord})`, 'gi'));
  }
};

const SearchItem = (search: SearchProps) => {
  const [parts, setParts] = useState<string[] | undefined>();
  const { searchWord } = useSelector(searchSelector);

  useEffect(() => {
    if (search) {
      setParts(checkWord(search.sickNm, searchWord));
    }
  }, [search]);

  return (
    <>
      {parts &&
        parts.map((part, index) =>
          part.toUpperCase() === searchWord.toUpperCase() ? (
            <S.Highlight key={index}>{part}</S.Highlight>
          ) : (
            part
          )
        )}
    </>
  );
};

export default SearchItem;

const S = {
  Highlight: styled.span`
    color: orange;
    font-weight: bold;
  `,
};
