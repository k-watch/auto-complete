/* eslint-disable quotes */
import { useSearch } from 'modules/context/SearchContext';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const checkText = (text: string, query: string) => {
  if (query !== '' && text.includes(query)) {
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts;
  }
};

const SearchItem = ({ search }: any) => {
  const { searchText } = useSearch();
  const [parts, setParts] = useState<string[] | undefined>();
  const searchRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (search) {
      const temp = checkText(search.sickNm, searchText);
      setParts(temp);
    }
  }, [search]);

  return (
    <>
      {parts &&
        parts.map((part, index) =>
          part.toLowerCase() === searchText ? (
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
  `,
};
