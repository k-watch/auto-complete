import SearchBar from 'components/SearchBar';
import SearchList from 'components/SearchList';
import styled from 'styled-components';
import { absoluteCenter, flexBox } from 'styles/mixins';

const MainPage = () => {
  return (
    <S.Wrap>
      <S.Title>
        <p>국내 모든 임상시험 검색하고</p>
        <p>온라인으로 참여하기</p>
      </S.Title>
      <SearchBar />
      <SearchList />
    </S.Wrap>
  );
};

export default MainPage;

const S = {
  Wrap: styled.div`
    ${absoluteCenter()};
    width: 500px;
  `,

  Title: styled.div`
    text-align: center;
    font-size: 35px;
    font-weight: bold;

    p {
      margin-bottom: 20px;
    }
  `,
};
