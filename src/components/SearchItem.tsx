/* eslint-disable quotes */
import { searchSelector } from 'modules/search/search';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const checkText = (text: string, query: string) => {
  if (query !== '' && text.includes(query)) {
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts;
  }
};

const SearchItem = ({ search }: any) => {
  const [parts, setParts] = useState<string[] | undefined>();
  const { searchWord } = useSelector(searchSelector);

  useEffect(() => {
    if (search) {
      const temp = checkText(search.sickNm, searchWord);
      setParts(temp);
    }
  }, [search]);

  return (
    <S.Wrap>
      {parts &&
        parts.map((part, index) =>
          part.toLowerCase() === searchWord ? (
            <S.Highlight key={index}>{part}</S.Highlight>
          ) : (
            part
          )
        )}
    </S.Wrap>
  );
};

export default SearchItem;

const S = {
  Wrap: styled.div`
    /* overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap; */
  `,
  Highlight: styled.span`
    color: orange;
    font-weight: bold;
  `,
};
