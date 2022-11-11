import { SearchProps } from './SearchList';
import { searchSelector } from 'modules/search/search';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const setHighlightWord = (resultWord: string, searchWord: string) => {
  if (resultWord.toUpperCase().includes(searchWord.toUpperCase())) {
    return resultWord.split(new RegExp(`(${searchWord})`, 'gi'));
  }
};

const SearchItem = (search: SearchProps) => {
  const [words, setWords] = useState<string[] | undefined>();
  const { searchWord } = useSelector(searchSelector);

  useEffect(() => {
    if (search) {
      setWords(setHighlightWord(search.sickNm, searchWord));
    }
  }, [search]);

  return (
    <>
      {words &&
        words.map((word, index) =>
          word.toUpperCase() === searchWord.toUpperCase() ? (
            <S.Highlight key={index}>{word}</S.Highlight>
          ) : (
            word
          )
        )}
    </>
  );
};

export default SearchItem;

const S = {
  Highlight: styled.span`
    font-weight: bold;
    color: ${({ theme }) => theme.colors.darkBlue};
  `,
};
