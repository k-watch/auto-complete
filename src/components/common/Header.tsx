import styled from 'styled-components';
import { ReactComponent as Logo } from 'styles/icons/logo.svg';
import { flexBox } from 'styles/mixins';

const Header = () => {
  return (
    <S.Wrap>
      <div>
        <Logo height={25} />
      </div>
      <div>
        <ul>
          <li>소개</li>
          <li>질문과 답변</li>
          <li>소식받기</li>
          <li>제휴/문의</li>
        </ul>
      </div>
    </S.Wrap>
  );
};

export default Header;

const S = {
  Wrap: styled.div`
    ${flexBox()};
    justify-content: space-between;
    width: 1000px;
    height: 20px;
    margin: 0 auto;
    padding: 30px;

    ul {
      ${flexBox()};
      justify-content: space-between;
      width: 400px;
      font-weight: bold;
    }
  `,
};
